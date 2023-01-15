import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
`
const H2 = styled.h2`
  margin-bottom:20px;
  color: #42b983;
  font-weight: 600;
`
const P =styled.p`
  text-indent: 2em;
  color: #42b983;
`

function About() {
  return (
    <Wrapper>
      <H2>森林图库</H2>
      <P>欢迎使用森林图库，这是一个兼具图片裁剪、上传、存储、删除等功能于一体的图片存储网站，后续更多功能施工中……</P>
    </Wrapper>
  );
}

export default About;