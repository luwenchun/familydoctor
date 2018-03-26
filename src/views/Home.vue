<template>
	<wn-row class="container">
		<wn-col :span="24" class="header">
			<wn-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				<img src="../../static/img/logio.png" alt="logo"/>
			</wn-col>
			<wn-col :span="4">
				<div class="tools" v-on:click.prevent="collapse">
					<i class="iconfont icon-menu" style="color: #0070c3"></i>
				</div>
			</wn-col>
			<wn-col :span="6" class="userinfo">
				<wn-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner">
						<i class="bar fa-bell"></i>
					</span>
					<wn-dropdown-menu slot="dropdown">
						<wn-dropdown-item>个人信息修改</wn-dropdown-item>
					</wn-dropdown-menu>
				</wn-dropdown>
				<wn-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner">
						<i class="bar fa-calendar"></i>
					</span>
					<wn-dropdown-menu slot="dropdown">
						<wn-dropdown-item>添加</wn-dropdown-item>
					</wn-dropdown-menu>
				</wn-dropdown>
				<wn-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner">
						<i class="bar fa-envelope"></i>
					</span>
					<wn-dropdown-menu slot="dropdown">
						<wn-dropdown-item>我的消息</wn-dropdown-item>
					</wn-dropdown-menu>
				</wn-dropdown>
				<wn-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner">
						<i class="bar fa-cale"></i>
					</span>
					<wn-dropdown-menu slot="dropdown">
						<wn-dropdown-item>添加</wn-dropdown-item>
					</wn-dropdown-menu>
				</wn-dropdown>
				<wn-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner">
						<i class="bar fa-set"></i>
					</span>
					<wn-dropdown-menu slot="dropdown">
						<wn-dropdown-item>我的消息</wn-dropdown-item>
						<wn-dropdown-item>设置</wn-dropdown-item>
						<wn-dropdown-item divided @click.native="logout">退出登录</wn-dropdown-item>
					</wn-dropdown-menu>
				</wn-dropdown>
			</wn-col>
		</wn-col>


		<wn-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航搜索-->
        <div class="nav-search">
          <wn-input placeholder="请输入查询内容" icon="search" v-model="searchinput" :on-icon-click="handleIconClick" ></wn-input>
        </div>

				<!--导航菜单-->
				<wn-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router v-show="!collapsed">
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<wn-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title">
								<i :class="item.iconCls"></i>{{item.name}}
							</template>
							<wn-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</wn-menu-item>
						</wn-submenu>
						<wn-menu-item v-if="item.leaf&&item.children.length>=0" :index="item.children[0].path">
							<i :class="item.iconCls"></i>{{item.children[0].name}}
						</wn-menu-item>
					</template>
				</wn-menu>
				<!--导航菜单-折叠后-->
				<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
								<i :class="item.iconCls"></i>
							</div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
								<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item"  :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">
									{{child.name}}
								</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 40px;line-height: 40px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
							</li>
						</template>
					</li>
				</ul>
				<i class="bav_bg"></i>
			</aside>


			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<wn-col :span="24" class="breadcrumb-container">
						<wn-breadcrumb separator="/" class="breadcrumb-inner">
							<wn-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</wn-breadcrumb-item>
						</wn-breadcrumb>
					</wn-col>
					<wn-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</wn-col>
				</div>
			</section>
		</wn-col>
	</wn-row>
</template>

<script>
	export default {
		data() {
			return {
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: '',
        searchinput:'',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
      handleIconClick() {
        console.log("pk");
      },
			handleopen() {
				console.log('handleopen');
				console.log("okok");
			},
			handleclose() {
				console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {
				});
			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
		},
	}

</script>

<style scoped lang="scss">
	/* @import '~scss_vars'; */


	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 50px;
			line-height: 50px;
			background: #fff;
			color:#fff;
			/*box-shadow: 0 1px 2px #eee;*/
      border-bottom: 1px solid #eee;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					margin-right:10px;
					.bar {
						display: inline-block;
						width: 29px;
						height: 29px;
						margin-top: 13px;
					}
					.fa-set {
						background: url("../../static/img/hf.png")no-repeat;
					}
					.fa-set:hover {
						background: url("../../static/img/hf_hover.png")no-repeat;
					}
					.fa-cale {
						background: url(../../static/img/zbzs.png)no-repeat;
					}
					.fa-cale:hover {
						background: url(../../static/img/zbzs_hover.png)no-repeat;
					}
					.fa-envelope {
							background: url(../../static/img/icon_ts.png)no-repeat;
					}
					.fa-envelope:hover {
						background: url(../../static/img/icon_ts_hover.png)no-repeat;
					}
					.fa-calendar {
						background: url(../../static/img/zx.png)no-repeat;
					}
						.fa-calendar:hover {
							background: url(../../static/img/zx_hover.png)no-repeat;
						}
					.fa-bell {
						background: url(../../static/img/user.png)no-repeat;
					}
					.fa-bell:hover {
						background: url(../../static/img/user_hover.png)no-repeat;
					}
				}
			}
			.logo {
				height:50px;
				font-size: 22px;
				padding-left:15px;
				padding-right:15px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				background: #0172b4;
			}
			.logo-width{
				display: block;
				width:200px;
				text-align: center;
			}
			.logo-collapse-width{
				width:60px;
				img{
					display: none;
						}
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 50px;
				line-height: 50px;
				cursor: pointer;
			}
		}
		.main {
			position: absolute;
			top: 50px;
			bottom: 0;
			overflow: hidden;
			aside {
				 width: 200px;
				 position: absolute;
					height: 100%;
					top: 0;
					bottom: 0;
					background: -webkit-linear-gradient(top,#007ec9,#00a8a6);
					transition: 0.2s;
	           .el-menu{
			   		background:transparent;
				   z-index: 1;
           border-right: none;
				}
	          .collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}
				}
			}
			.menu-collapsed{
				position: absolute;
				top: 0;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 200px;
				width: 200px;
				.bav_bg{
					display: inline-block;
					background: url("../../static/img/nav_bg.png");
					width: 200px;
					height: 337px;
					position: absolute;
					bottom: 0;
				}
			}
			.content-container {
				 background: #fafafa;
        margin-left: 200px;
				overflow-y: scroll;
				padding: 20px;
        z-index: 0;

				.breadcrumb-container {
					margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						padding: 10px;
						margin-bottom: 10px;
					}
				}
				.content-wrapper {
					background-color: transparent;
					box-sizing: border-box;
				}
			}

      .menu-collapsed+.content-container{
        margin-left: 60px!important;
      }
		}
	}

	@media (max-width: 767px) {
		::-webkit-scrollbar-thumb {
			background-color: #f5f5f5;
			height: 50px;
			outline-offset: -2px;
			outline: 1px solid #fff;
			-webkit-border-radius: 4px;
			border: 1px solid #fff;
		}
		::-webkit-scrollbar-thumb:hover {
			height: 50px;
			background-color: #a0a0a0;
			-webkit-border-radius: 4px;
		}
		::-webkit-scrollbar {
			width: 6px;
			height: 6px;
		}
		::-webkit-scrollbar-track-piece {
			background-color: #fff;
			-webkit-border-radius: 0;
		}
		.menu-collapsed{
			display: none;
		}
		.menu-collapsed+.content-container{
			left: 0!important;
		}
	}
</style>
