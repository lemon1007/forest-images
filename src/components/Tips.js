import React from 'react';
import {useStores} from '../stores';
import {observer} from 'mobx-react';
import styled from 'styled-components';

const Tips = styled.div`
  color: white;
  margin: 25px auto;
  padding: 15px;
  text-align: center;
  background-color: #42b983;
`;

const Component = observer(({children}) => {

  const {UserStore} = useStores();

  return (
    <>
      {UserStore.currentUser ? null : <Tips>{children}</Tips>}
    </>
  );
});


export default Component;