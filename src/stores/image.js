import {observable, action, makeObservable, runInAction} from 'mobx';
import {Uploader} from '../models';
import {message} from 'antd';

class ImageStore {

  constructor() {
    makeObservable(this);
  }

  @observable filename = '';
  @observable file = null;
  @observable isUploading = false;
  @observable serverFile = null;

  @action setFilename(newFilename) {
    this.filename = newFilename;
  }

  @action setFile(newFile) {
    this.file = newFile;
  }

  @action upload() {
    runInAction(() => {
      this.isUploading = true;
      this.serverFile = null;
    });
    return new Promise((resolve, reject) => {
      Uploader.add(this.file, this.filename)
        .then(serverFile => {
          runInAction(() => {
            this.serverFile = serverFile;
          });
          resolve(serverFile);
        })
        .catch(err => {
          message.error('上传失败');
          reject(err);
        })
        .finally(() => {
          runInAction(() => {
            this.isUploading = false;
          });
        });
    });
  }

  @action reset() {
    runInAction(() => {
      this.isUploading = false;
      this.serverFile = null;
    });
  }

}

export default new ImageStore();
