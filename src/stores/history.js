import {observable, action, makeObservable, runInAction} from 'mobx';
import {Uploader} from '../models';
import {message} from 'antd';

class HistoryStore {

  constructor() {
    makeObservable(this);
  }

  @observable list = [];
  @observable isLoading = false;
  @observable hasMore = true;
  @observable page = 0;
  limit = 10;

  @action append(newList) {
    this.list = this.list.concat(newList);
  }

  @action find() {
    runInAction(() => {
      this.isLoading = true;
    });
    Uploader.find({page: this.page, limit: this.limit})
      .then(newList => {
        this.append(newList);
        this.page++;
        if (newList.length < this.limit) {
          runInAction(() => {
            this.hasMore = false;
          });
        }
      }).catch(error => {
      message.error('加载数据失败');
    }).finally(() => {
      runInAction(() => {
        this.isLoading = false;
      });
    });
  }

  @action delete(oid) {
    Uploader.delete(oid)
      .then(() => {
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
        message.error('删除失败');
      });
  }

  @action reset() {
    this.list = [];
    this.page = 0;
    runInAction(() => {
      this.isLoading = false;
      this.hasMore = true;
    });
  }

}


export default new HistoryStore();
