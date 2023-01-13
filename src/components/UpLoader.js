import React, {useRef} from 'react';
import {useStores} from '../stores';
import {observer, useLocalStore} from 'mobx-react';
import {Upload, message, Spin} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import styled from 'styled-components';

const {Dragger} = Upload;

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  border: 1px dashed #ccc;
  margin-top: 30px;
`;
const ImgUrl = styled.a`
  word-wrap: break-word;
  word-break: normal;
  max-width: 100%;
  font-size: 12px;

  &:hover {
    color: #42b983;
  }
`;

const ImgShow = styled.img`
  max-width: 60%;
`;
const H2 = styled.h2`
  margin: 20px 0;
  text-align: center;
`;
const Input = styled.input`
  border: none;
  font-size: 12px;
  padding: 5px;
  width: 120px;
  height: 30px;
  border-radius: 10px;
  margin-right: 10px;

  &:focus {
    outline: 1px solid #42b983;
  }
`;
const Dt = styled.dt`
  margin-top: 15px;
`;
const Dd = styled.dd`
  padding-top: 3px;
`;


const Component = observer(() => {

  const {ImageStore, UserStore} = useStores();
  const refWidth = useRef();
  const refHeight = useRef();
  const store = useLocalStore(() => ({

    width: null,
    setWidth(width) {
      store.width = width;
    },
    get widthStr() {
      return store.width ? `/w/${store.width}` : '';
    },

    height: null,
    setHeight(height) {
      store.height = height;
    },
    get heightStr() {
      return store.height ? `/h/${store.height}` : '';
    },

    get fullStr() {
      return ImageStore.serverFile.attributes.url.attributes.url + '?imageView2/0' + store.widthStr + store.heightStr;
    }
  }));

  const bindWidth = () => {
    store.setWidth(refWidth.current.value);
  };

  const bindHeight = () => {
    store.setHeight(refHeight.current.value);
  };

  const props = {
    showUploadList: false,
    beforeUpload: file => {
      ImageStore.setFile(file);
      ImageStore.setFilename(file.name);
      if (UserStore.currentUser === null) {
        message.warning('请先登录再上传图片！');
        return false;
      }
      if (!/(svg$)|(png$)|(jpg$)|(jpeg$)|(gif$)/ig.test(file.type)) {
        message.error('上传文件类型错误');
        return false;
      }
      if (file.size > 1024 * 1024) {
        message.error('上传文件最大1M');
        return false;
      }
      ImageStore.upload()
        .then((serverFile) => {
          console.log('上传成功');
          console.log(serverFile);
        })
        .catch((error) => {
          console.log('上传失败');
          console.log(error);
        });
      return false;
    }
  };

  return (
    <div>
      <Spin tip="图片上传中……" spinning={ImageStore.isUploading}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined/>
          </p>
          <p className="ant-upload-text">点击或拖拽上传图片</p>
          <p className="ant-upload-hint">仅支持.svg/.png/.jpg/.jpeg/.gif格式的图片，图片最大不能超过1M</p>
        </Dragger>
      </Spin>
      <div>
        {
          ImageStore.serverFile ? <Wrapper>
            <H2>上传结果</H2>
            <dl>
              <Dt>线上地址</Dt>
              <Dd>
                <ImgUrl href={ImageStore.serverFile.attributes.url.attributes.url} target="_blank">
                  {ImageStore.serverFile.attributes.url.attributes.url}
                </ImgUrl>
              </Dd>

              <Dt>文件名</Dt>
              <Dd>{ImageStore.serverFile.attributes.filename}</Dd>

              <Dt>图片预览</Dt>
              <Dd>
                <ImgShow src={ImageStore.serverFile.attributes.url.attributes.url}/>
              </Dd>

              <Dt>更多尺寸</Dt>
              <Dd>
                <Input ref={refWidth} onChange={bindWidth} placeholder="最大宽度(可选)"/>
                <Input ref={refHeight} onChange={bindHeight} placeholder="最大高度(可选)"/>
              </Dd>
              <Dd>
                <ImgUrl href={store.fullStr} target="_blank">{store.fullStr}</ImgUrl>
              </Dd>
            </dl>
          </Wrapper> : null
        }
      </div>
    </div>
  );
});


export default Component;