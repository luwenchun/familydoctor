import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users,Options } from './data/user';
let _Users = Users;
let _Options=Options;

export default {
  /**
   * mock
   */
  ajaxhook() {
    let ajax = new MockAdapter(axios);
    // mock success request
    ajax.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    ajax.onGet('/error').reply(500, {
      msg: 'failure'
    });

    //登录
    ajax.onPost('/login').reply(config => {
      let {username, password} = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              //u是个数组对象
              user = u;
              //user.password = undefined;
              return true;
            }
          });

          if (hasUser) {
            resolve([200, { code: 200, msg: '请求成功', user }]);
          } else {
            resolve([200, { code: 500, msg: '账号或密码错误' }]);
          }
        }, 1000);
      });
    });

    //获取当前页面初始化option
    ajax.onGet('/option').reply(config => {
      let route=config.params.route;
      let mockOptions = _Options[route].select;
      //对符合路由的option进行过滤
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            Options: mockOptions
          }]);
        }, 1000);
      });
    });


    //获取用户列表（分页）(表格数据初始化)
    ajax.onGet('/user/listpage').reply(config => {
      let {page} = config.params;
      //let mockUsers = _Users.filter(user => {
      ////  if (name && user.name.indexOf(name) == -1) return false;
      //  return true;
      //});
      let mockUsers = _Users;
      let total = _Users.length;
      mockUsers = mockUsers.filter((u, index) => index < 10 * page && index >= 10 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }]);
        }, 1000);

      });
    });
    //基础服务条件查询用户列表
    ajax.onGet('/user/list').reply(config => {
      let {page,illness,jsm,xylx,khlx,zt,xyname} = config.params;
      debugger
      let mockUsers = _Users.filter(user => {
        if (name && user.illness.indexOf(illness) == -1||user.jsm.indexOf(jsm) == -1||user.xylx.indexOf(xylx) == -1||user.khlx.indexOf(khlx) == -1||user.state.indexOf(zt) == -1||user.xyname.indexOf(xyname) == -1)
          return false;
        return true;
      });

      let total = mockUsers.length;

      mockUsers = mockUsers.filter((u, index) => index < 10 * page && index >= 10 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers,
            total: total
          }]);
        }, 1000);
      });
    });
    //协议项目条件查询用户列表

    //删除用户
    ajax.onGet('/user/remove').reply(config => {
      let { id } = config.params;
      _Users = _Users.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除用户
    ajax.onGet('/user/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Users = _Users.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });
//获取当前页面初始化修改当前行的状态
    ajax.onGet('/handleState').reply(config => {
      let id=config.params;
      _Users.some(u => {
        if (u.id === id) {
          u.state = '停用';
          return true;
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '修改成功'
          }]);
        }, 500);
      });
    });
//获取当前页面初始化修改当前行的状态
    ajax.onGet('/handleState').reply(config => {
      let id=config.params;
      _Users.some(u => {
        if (u.id === id) {
          u.state = '停用';
          return true;
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '修改成功'
          }]);
        }, 500);
      });
    });
    //获取当前页面初始化修改当前行的状态
    ajax.onGet('/handleStar').reply(config => {
      let id=config.params;
      _Users.some(u => {
        if (u.id === id) {
          u.state = '启用';
          return true;
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '修改成功'
          }]);
        }, 800);
      });
    });
    //批量修改状态
    ajax.onGet('/batchSets').reply(config => {
      let { ids,zt } = config.params;
      ids = ids.split(',');
     ids.forEach(function(e){
       _Users.some(u => {
         if (u.id === e) {
           u.state = zt;
         }
     });
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });
    //编辑用户
    ajax.onGet('/user/edit').reply(config => {
      let { id, name, addr, age, birth, sex, illness, jsm, fwblx, syrp, price, spzt,spr,state,xyname,xylx,px,xydesc,jcfw,fwbm,khlx,khfz,kfyy } = config.params;
      _Users.some(u => {
        if (u.id === id) {
          u.name = name;
          u.addr = addr;
          u.age = age;
          u.birth = birth;
          u.sex = sex;
          u.illness = illness;
          u.jsm =jsm;
          u.fwblx =fwblx;
          u.syrp =syrp;
          u.price =price;
          u.spzt =spzt;
          u.spr =spr;
          u.state =state;
          u.xyname=xyname;
          u.xylx=xylx;
          u.px=px;
          u.xydesc=xydesc;
          u.jcfw=jcfw;
          //基础服务
          u.fwbm=fwbm;
          u.khlx=khlx;
          u.khfz=khfz;
          u.kfyy=kfyy;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });

    //新增用户
    ajax.onGet('/user/add').reply(config => {
      let { name, addr, age, birth, sex,illness,fwbm,jsm,xylx,khlx,khfz,price,px,kfyy,zt } = config.params;
      _Users.push({
        name: name,
        addr: addr,
        age: age,
        birth: birth,
        sex: sex,
        illness:illness,
        fwbm:fwbm,
        jsm:jsm,
        xylx:xylx,
        khlx:khlx,
        khfz:khfz,
        price:price,
        px:px,
        kfyy:kfyy,
        state:zt
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });

  }
};
