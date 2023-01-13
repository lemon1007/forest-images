import React from 'react';
import {observer} from 'mobx-react';
import {useStores} from '../stores';
import InfiniteScroll from 'react-infinite-scroller';
import {List} from 'antd';

const Component = observer(() => {

  const {HistoryStore} = useStores();

  const options = {

  }

  return (
    <div>
      <InfiniteScroll>
        <List dataSource={HistoryStore.list}
              renderItem={
                item=>{
                  <List.item key={item.id}></List.item>
                }
              }
        >
        </List>
      </InfiniteScroll>
    </div>
  );
});

export default Component;