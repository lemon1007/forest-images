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
  width: 20%;
`;
const WrapperItemUrl = styled.div`
  width: 50%;
`;
const WrapperDelete = styled.div`
  width: 10%;
`;
const DeleteButton = styled.button`
  background-color: #42b983;
  width: 60px;
  height: 30px;
  border-radius: 10px;
  color: white;
  border: none;
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

  &:hover {
    color: #42b983;
  }
`;

const Component = observer(() => {

  const {HistoryStore} = useStores();

  const loadMore = () => {
    HistoryStore.find();
  };

  //TODO
  const handleDelete = () => {
    // HistoryStore.delete();
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
              <WrapperDelete>
                <DeleteButton onClick={handleDelete}>删除</DeleteButton>
              </WrapperDelete>
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