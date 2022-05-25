import React from 'react';
import { Item } from "./Item";
import {
  Container,
  Content,
  Header,
  ItemsContent,
  Divider
} from "./style"

export const BusinessListing: React.FC = () => {
  return (
    <Container>
      <Content>
      <Header>
        4 resultados encontrados
      </Header>
      <ItemsContent>
        <Item />
        <Divider />
        <Item />
        <Divider />
        <Item />
        <Divider />
        <Item />
      </ItemsContent>
      </Content>
    </Container>
  );
}
