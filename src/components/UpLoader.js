import React, {useRef} from 'react';
import {useStores} from '../stores';
import {observer} from 'mobx-react';
import {Upload} from 'antd';
import {InboxOutlined} from '@ant-design/icons';

const {Dragger} = Upload;


const Component = observer(() => {

  const ref = useRef();
  const {ImageStore} = useStores();

  const props = {
    beforeUpload: file => {
      return false;
    }
  };

  const bindChange = () => {
    console.log(ref.current);
    if (ref.current.files.length > 0) {
      ImageStore.setFile(ref.current.files[0]);
      ImageStore.setFilename(ref.current.files[0].name);
      ImageStore.upload()
        .then((serverFile) => {
          console.log('上传成功');
          console.log(serverFile);
        })
        .catch((error) => {
          console.log('上传失败');
          console.log(error);
        });
    }
    window.file = ref.current;
  };


  return (
    <div>
      <h3>文件上传</h3>
      <input type="file" ref={ref} onChange={bindChange}/>
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
    </div>
  );
});


export default Component;