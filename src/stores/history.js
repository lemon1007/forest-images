import {observable, action, makeObservable, computed, runInAction} from 'mobx';
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
          this.hasMore = false;
        }
      })
      .catch(error => {
        message.error('数据加载失败');
      })
      .finally(() => {
        runInAction(() => {
          this.isLoading = false;
        });
      });
  }

  // TODO
  // @action delete() {
  //   this.isLoading = true;
  //   Uploader.delete().then()
  //     .catch(error => {console.log(error);})
  //     .finally(() => [
  //       this.isLoading = false
  //     ]);
  // }


  @action reset() {
    this.list = [];
    this.hasMore = true;
    this.page = 0;
    runInAction(() => {
      this.isLoading = false;
    });
  }


}


export default new HistoryStore();
