import React from 'react';
import {observer} from 'mobx-react';
import UpLoader from '../components/UpLoader';
import Tips from '../components/Tips';

const Component = observer(() => {
  return (
    <>
      <Tips>提示:请先登录再上传图片</Tips>
      <UpLoader/>
    </>
  );
});

export default Component;