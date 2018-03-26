import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'static/user.png',
    name: '张某某'
  }
];
//模拟用户信息
const Users = [];

for (let i = 0; i < 76; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    //服务记录
    //姓名
    name: Mock.Random.cname(),
    //性别
    sex: Mock.Random.pick(['男', '女']),
    //2000-02-17
    birth: Mock.Random.date(),
    //基础服务
    fwjlbase: Mock.Random.pick(['快速血糖', '入户健康指导']),
    //服务时间
    servicedate:Mock.Random.pick(['2017-10-24', '2017-10-25',"2017-10-26"]),
    //服务人
    fwr:Mock.Random.pick(['孙杰', '李姐']),
    //服务来源
    fwly:Mock.Random.pick(['系统生成', '手动录入']),
    //服务次数
    fwcs:Mock.Random.natural(1, 4),
    //签约日期
    qyrq:Mock.Random.pick(['2017-10-24', '2017-10-25',"2017-10-26"]),
    //签约团队
    qytd:Mock.Random.pick(['第一团队', '第二团队',"第三团队"]),
    //山东省 临沂市 费县
    addr: Mock.mock('@county(true)'),
    //年龄
    'age|18-60': 1,
    //"1994-05-11 06:14:57"
    time:Mock.Random.datetime(),
    //身份证号
    ID:Mock.Random.id(),
//服务包
    //名称
    illness:Mock.Random.pick(['快速血压', '慢病随访', '血常规']),
    //检索码
    jsm:Mock.Random.cword('KSX', 4),
    //服务包类型
    fwblx:Mock.Random.pick(['基本包', '个性包', '自建包']),
    //适宜人群
    syrq:Mock.Random.pick(['健康', '老年人', '儿童','高血压','糖尿病']),
    //参考价格(元)
    price:Mock.Random.natural(60, 2000),
    //审批状态
    spzt:Mock.Random.pick(['通过', '未通过', '审批中']),
    //审批人
    spr:Mock.Random.cname(),
    //状态
    state:Mock.Random.pick(['启用', '停用']),
//协议项目名称
    xyname:Mock.Random.pick(['全科预约治疗', '签约“四个一”服务']),
    //基础服务
    xylx:Mock.Random.pick(['基本医疗','公共卫生']),
    //排序
    px:Mock.Random.natural(1, 10),
    //基础服务
    jcfw:Mock.Random.natural(0, 12),
  //项目描述
    xydesc:Mock.Random.pick(['全科门诊就诊时，为签约居民提供专人管理、专人征聊，预约治疗优化,专人管理、专人征聊，预约治疗优化','建立一份档案，一份家庭医生签约服务协议，发放一个联系卡、表，手册定时推送,专人征聊，预约治疗优化,专人管理、专人征聊，预约治疗优化']),
//基础服务
//    编号
   khfz:Mock.Random.natural(1, 10),
    kfyy:Mock.Random.pick(['是', '否']),
   khlx:Mock.Random.pick(['不考核','自动考核','手动考核']),
    fwbm:Mock.Random.integer(10000),
    //协议模板
    mbname:Mock.Random.pick(['老年人合约模板','家庭医生签约服务合约文书模板']),
    mblx:Mock.Random.pick(['机构模板','系统模板']),
    mrmb:Mock.Random.pick(['是','否']),
    //团队管理
    phone: /^1[385][1-9]\d{8}/,
    telphone: /[0-8]\d{3}-(2|6|8)\d{6,7}/,
    //家医注册
    gw:Mock.Random.pick(['全科医生','社区护士','防保人员']),
    username:Mock.Random.name(),
    'xybh|+1': 201702030001,
    xyglzt:Mock.Random.pick(['新签约','续约','解约']),
    yyqyzt:Mock.Random.pick(['待处理','已签约','已废弃']),
  }));
}
//基础设置
//模拟select option
const Options = {
    jcfw:{
      select:{
        xylx:[{value:'基本医疗',label:'基本医疗'},{value:'公共卫生',label:'公共卫生'}],
        khlx:[{value:'不考核',label:'不考核'},{value:'自动考核',label:'自动考核'},{value:'手动考核',label:'手动考核'}],
        zt:[{value:'启用',label:'启用'},{value:'停用',label:'停用'}],
        kfyy:[{value:'是',label:'是'},{value:'否',label:'否'}]
      }
    },
    fwb:{
      select:{
        fwblx:[{value:'自建包',label:'自建包'},{value:'基本包',label:'基本包'},{value:'个性包',label:'个性包'}],
        syrq:[{value:'健康',label:'健康'},{value:'糖尿病',label:'糖尿病'},{value:'老年人',label:'老年人'},{value:'儿童',label:'儿童'},{value:'高血压',label:'高血压'}],
        spzt:[{value:'通过',label:'通过'},{value:'未通过',label:'未通过'},{value:'审批中',label:'审批中'},],
        zt:[{value:'启用',label:'启用'},{value:'停用',label:'停用'}]
      },
    },
  xyxm:{
    select:{
      xylx:[{value:'基本医疗',label:'基本医疗'},{value:'公共卫生',label:'公共卫生'}],
      zt:[{value:'启用',label:'启用'},{value:'停用',label:'停用'}]
    },
  }
};



export { LoginUsers, Users ,Options};






























