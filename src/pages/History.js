import React from 'react';
import HistoryList from '../components/HistoryList';
import styled from 'styled-components';


const H2 = styled.h2`
  margin-bottom:20px;
  color: #42b983;
  font-weight: 800;
`


function History() {
  return (
    <>
      <H2>上传记录</H2>
      <HistoryList/>
    </>
  );
}

export default History;