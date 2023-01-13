import React from 'react';
import {observer} from 'mobx-react';
import {useStores} from '../stores';
import InfiniteScroll from 'react-infinite-scroller';

const Component = observer(() => {

  const {HistoryStore} = useStores();

  return (
    <div>HistoryList</div>
  );
});

export default Component;