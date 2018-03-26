<template>
    <section>
        <div class="search" id="search">
            <el-input placeholder="请输入关键字" v-model="key" size="large" @keyup.enter.native="tips">
                <el-select v-model="active" slot="prepend" placeholder="搜索全部xzxx" style="width: 130px;">
                    <el-option v-for="(item,index) in navList" :label="item.cn" :value="item.en" :key="item.en"></el-option>
                </el-select>
                <el-button  icon="search" @click="tips" ></el-button>
            </el-input>
        </div>
    </section>
</template>
<script>

    export default {
        name: 'search',
        data () {
        return {
            key:"",
            navList:[
                {cn:"最新预告",en:"trailer"},
                {cn:"精彩影评",en:"article"},
                {cn:"影评视频",en:"video"},
                {cn:"评论专区",en:"comment"}
            ],
            active:"111"
        }
    },
    methods:{
        tips(){
            this.$message('假的啦，没有数据！');
        }
    },
    watch:{
        $route(){
            this.active=this.$route.name!='home'?this.$route.name:'';
        }
    },
    mounted(){
        this.active=this.$route.name!='home'?this.$route.name:'';
    }
    }
</script>

<style  scoped>
    #search .el-select .el-input {
        width: 110px;
    }
    .search {
        background: rgba(241, 241, 241, 0.9);
    }
    .page-logo {
        text-align: center;
        padding: 5px;
    }
    a{
        color: #1D8CE0;
        font-size: 24px;
        text-decoration: none;
    }

</style>