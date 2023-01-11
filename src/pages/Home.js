import React from 'react';
import {observer} from 'mobx-react';
import {useStores} from '../stores';
import UpLoader from '../components/UpLoader';

const Component = observer(() => {
  const {UserStore} = useStores();
  return (
    <>
      {
        UserStore.currentUser ?
          <>欢迎您，用户{UserStore.currentUser.attributes.username}</> :
          <>请登录账户</>
      }
      <UpLoader/>
    </>
  );
});

export default Component;