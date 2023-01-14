import AV, {User} from 'leancloud-storage';


// leancloud配置
AV.init({
  appId: '05LZAm3nFx4pyhrFdmCTcJCx-gzGzoHsz',
  appKey: 'wl304vdXkGM3b9264nXvzH16',
  serverURL: 'https://05lzam3n.lc-cn-n1-shared.com'
});

const Auth = {

  // 注册逻辑
  register(username, password) {
    let user = new User();
    user.setUsername(username);
    user.setPassword(password);
    return new Promise((resolve, reject) => {
      user.signUp().then(loginUser => resolve(loginUser), error => reject(error));
    });
  },

  // 登录逻辑
  login(username, password) {
    return new Promise((resolve, reject) => {
      User.logIn(username, password).then(loginUser => resolve(loginUser), error => reject(error));
    });
  },

  // 注销逻辑
  logout() {
    User.logOut();
  },

  // 获取当前用户信息
  getCurrentUser() {
    return User.current();
  }

};

const Uploader = {
  add(file, filename) {
    const item = AV.Object('Image');
    const avFile = new AV.File(filename, file);
    item.set('filename', filename);
    item.set('owner', AV.User.current());
    item.set('url', avFile);
    return new Promise((resolve, reject) => {
      item.save().then(serverFile => resolve(serverFile), error => reject(error));
    });
  },

  // TODO
  // delete() {
    // let item = AV.Object.createWithoutData('Image', this.data.id);
    // return new Promise((resolve, reject) => {
    //   item.destroy()
    //     .then(res => {
    //       resolve(res);
    //       console.log('删除成功');
    //       console.log(res.id)
    //       return res.id
    //     }, error => {
    //       reject(error);
    //       console.log('删除失败');
    //     });
    // });
    // const item = AV.Object('Image');
    // const query = AV.Query(item);
    // query.equalTo('item', 'objectId');
    // query.destroyAll({
    //   success: function () {
    //     console.log('删除成功');
    //     console.log(this.success);
    //   },
    //   error: function () {
    //     console.log('删除失败');
    //     console.log(this.error);
    //   }
    // });
  // },

  find(page = 0, limit = 10) {
    const query = new AV.Query('Image');
    query.include('owner');
    query.limit(limit);
    query.skip(page * limit);
    query.descending('createdAt');
    query.equalTo('owner', AV.User.current());
    return new Promise((resolve, reject) => {
      query.find()
        .then(results => resolve(results))
        .catch(error => reject(error));
    });
  },

};

window.Uploader = Uploader;


export {Auth, Uploader};