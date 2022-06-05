import React from 'react';
import Map from '../../../../../components/Map';

 import { Container, Content, Title, Form, Legend } from './styles';

export const AdvancedSearch: React.FC = () => {
  return (
    <Container>
      <Content>
      <Title>Pesquisa avançada</Title>
      <Form>
        <Legend>Localização (Selecione uma localidade no mapa abaixo)</Legend>
        <Map />
      </Form>
      </Content>
    </Container>
  );
}

