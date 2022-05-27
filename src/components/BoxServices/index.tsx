import React from 'react';


import { Item } from "./Item";

import {
  Container,
  Header,
  Content } from './styles';

const BoxServices: React.FC = () => {
  return (
    <Container>
      <Header>Serviços</Header>
      <Content>
        <Item />
        <Item />
        <Item />
        <Item />

      </Content>
    </Container>
  );
}

export default BoxServices;
