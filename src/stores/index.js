import {createContext, useContext} from 'react';
import AuthStore from './auth';
import UserStore from './user';
import ImageStore from './image';

const context = createContext({
  AuthStore, UserStore, ImageStore
});

// 调试获取测试数据
window.stores = {
  AuthStore, UserStore, ImageStore
};

export const useStores = () => useContext(context);