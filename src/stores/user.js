import {observable, action, makeObservable} from 'mobx';
import {Auth} from '../models';

class UserStore {

  constructor() {
    makeObservable(this);
    this.pullUser();
  }

  @observable currentUser = null;

  @action pullUser() {
    this.currentUser = Auth.getCurrentUser();
  }

  @action resetUser() {
    this.currentUser = null;
  }

}


export default new UserStore();
