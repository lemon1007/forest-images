import React, {useRef} from 'react';
import {useStores} from '../stores';
import {observer} from 'mobx-react';
import {Upload} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import styled from 'styled-components';

const {Dragger} = Upload;

const Urldiv = styled.div`
  word-wrap: break-word;
  word-break: normal;
  width: 300px;
  color: red;
  font-size: 12px;
`;


const Component = observer(() => {

  const {ImageStore} = useStores();

  const props = {
    showUploadList: false,
    beforeUpload: file => {
      ImageStore.setFile(file);
      ImageStore.setFilename(file.name);
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
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined/>
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
        </p>
      </Dragger>
      <div>
        <h3>上传结果</h3>
        {
          ImageStore.serverFile ?
            <Urldiv>{ImageStore.serverFile.attributes.url.attributes.url}</Urldiv> : null
        }
      </div>
    </div>
  );
});


export default Component;