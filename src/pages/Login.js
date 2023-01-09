import React from 'react';
import {observer} from 'mobx-react';
import {useStores} from '../stores/index';

const Component = observer(() => {
  const {AuthStore} = useStores();

  return (
    <>
      <h1>Login:{AuthStore.values.username}</h1>
    </>
  );
});

export default Component;