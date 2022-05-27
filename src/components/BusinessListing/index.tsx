import React, { useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { Item } from "./Item";
import {
  Container,
  Content,
  Header,
  ItemsContent,
  Divider
} from "./style"


export const BusinessListing: React.FC = () => {

  let navigate = useNavigate();

  return (
    <Container>
      <Content>
      <Header>
        4 resultados encontrados
      </Header>
      <ItemsContent>
        <Item/>
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
