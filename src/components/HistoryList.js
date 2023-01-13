import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '../stores';
import InfiniteScroll from 'react-infinite-scroller';
import {List, Spin} from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  border: 1px dashed #ccc;
  border-radius: 10px;
  text-align: center;
`;
const WrapperItemImg = styled.div`
  width: 20%;
`;
const WrapperItemName = styled.div`
  width: 30%;
`;
const WrapperItemUrl = styled.div`
  width: 40%;
`;
const ImgShow = styled.img`
  max-width: 100%;
`;
const H5 = styled.h5`
  font-size: 12px;
  max-width: 100%;
  word-wrap: break-word;
  word-break: normal;
`;
const ImgUrl = styled.a`
  max-width: 100%;
  font-size: 12px;
  word-wrap: break-word;
  word-break: normal;
`;

const Component = observer(() => {

  const {HistoryStore} = useStores();

  const loadMore = () => {
    HistoryStore.find();
  };

  useEffect(() => {

    return () => {
      HistoryStore.reset();
    };

  }, []);

  return (
    <Wrapper>
      <InfiniteScroll
        initialLoad={true}
        pageStart={0}
        loadMore={loadMore}
        hasMore={!HistoryStore.isLoading && HistoryStore.hasMore}
        useWindow={true}
      >
        <List
          dataSource={HistoryStore.list}
          renderItem={
            item => <List.Item key={item.id}>
              <WrapperItemImg>
                <ImgShow src={item.attributes.url.attributes.url}/>
              </WrapperItemImg>
              <WrapperItemName>
                <H5>{item.attributes.filename}</H5>
              </WrapperItemName>
              <WrapperItemUrl>
                <ImgUrl href={item.attributes.url.attributes.url} target="_blank">
                  {item.attributes.url.attributes.url}
                </ImgUrl>
              </WrapperItemUrl>
            </List.Item>
          }
        >
          {HistoryStore.isLoading && HistoryStore.hasMore && (
            <div>
              <Spin tip="加载中……"/>
            </div>
          )}
        </List>
      </InfiniteScroll>
    </Wrapper>
  );
});

export default Component;