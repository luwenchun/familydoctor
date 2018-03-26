import Login from './views/Login.vue'
import NotFound from './views/404.vue'
//公共头部和导航
import Home from './views/Home.vue'
//初始首页
import Main from './views/Main.vue'

//机构概括
import Jggk from './views/jggk/jggk.vue'
//const Jggk=require('./views/jggk/jggk.vue').default
//团队概括
import Tdgk from './views/tdgk/tdgk.vue'
//const Tdgk=require('./views/tdgk/tdgk.vue').default
//居民管理
import Yqyjm from './views/jmgl/yqyjm.vue'
//const Yqyjm=require('./views/jmgl/yqyjm.vue').default
import Wqyjm from './views/jmgl/wqyjm.vue'
//const Wqyjm=require('./views/jmgl/wqyjm.vue').default
import Zjjm from './views/jmgl/zjjm.vue'
//const Zjjm=require('./views/jmgl/zjjm.vue').default
import Yyqy from './views/jmgl/yyqy.vue'
//const Yyqy=require('./views/jmgl/yyqy.vue').default
//协议管理
import Xygl from './views/xygl/xygl.vue'
//家医管理
import Tdgl from './views/jygl/tdgl.vue'
import Jyzc from './views/jygl/jyzc.vue'
//服务记录
import Fwjl from './views/fwjl/fwjl.vue'
//基础设置
import Fwb from './views/jcsz/fwb.vue'
import Xyxm from './views/jcsz/xyxm.vue'
import Jcfw from './views/jcsz/jcfw.vue'
import Xymb from './views/jcsz/xymb.vue'
//other


let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '首页',
        iconCls: 'iconfont icon-icon_changyongcaidan',
        leaf: true,//只有一个节点
        children: [
            { path: '/main', component: Jggk, name: '机构概括' }
        ]
    },
    {
        path: '/',
        component: Home,
        iconCls: 'iconfont icon-icon_zhengfuyingyong',
        leaf: true,//只有一个节点
        children: [
            { path: '/tdgk', component: Tdgk, name: '团队概括' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '居民护理',
        iconCls: 'iconfont icon-icon_dashujufenxi',//图标样式class
        children: [
            { path: '/yjyjm', component: Yqyjm, name: '已签约居民'},
            { path: '/wqyjm', component: Wqyjm, name: '未签约居民' },
            { path: '/zjjm', component: Zjjm, name: '转介居民' },
            { path: '/yyjm', component: Yyqy, name: '预约签约' },
        ]
    },
    {
        path: '/',
        component: Home,
        iconCls: 'iconfont icon-icon_jiaoyizhongxinjianguan',
        leaf: true,//只有一个节点
        children: [
            { path: '/xygl', component: Xygl, name: '协议管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '家医管理',
        iconCls: 'iconfont icon-icon_weijiweijianguan',
        children: [
            { path: '/tdgl', component: Tdgl, name: '团队管理' },
            { path: '/jyzc', component: Jyzc, name: '家医注册' }
        ]
    },
    {
        path: '/',
        component: Home,
        iconCls: 'iconfont icon-icon_fagaiweijianguan',
        leaf: true,//只有一个节点
        children: [
            { path: '/fwjl', component:Fwjl, name: '服务记录' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '基础设置',
        iconCls: 'iconfont icon-jcsz',
        children: [
            { path: '/fwb', component: Fwb, name: '服务包' },
            { path: '/xyxm', component: Xyxm, name: '协议项目' },
            { path: '/jcfw', component: Jcfw, name: '基础服务' },
            { path: '/xymb', component: Xymb, name: '协议模板' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
