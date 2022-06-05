import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import Map from '../../../../../components/Map';
import { Range } from '../../../../../components/Range';

 import { Container, BackPage, Content, Title, Form, Legend, BoxContainer, Select, Button } from './styles';

export const AdvancedSearch: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <BackPage onClick={() => history.back()}>
        <BiArrowBack />
        Voltar
      </BackPage>
      <Content>
      <Title>Pesquisa avançada</Title>
      <Form>
        <BoxContainer>
        <Legend>Localização (Selecione uma localidade no mapa abaixo)</Legend>
        <Map />
        </BoxContainer>
        <BoxContainer>
          <Legend>Tipo de negócio</Legend>
          <Select name="type">
            <option value="">Selecione uma opção</option>
          </Select>
        </BoxContainer>
        <BoxContainer>
          <Legend>Faixa de preço</Legend>
          <Range />
        </BoxContainer>
        <BoxContainer>
        <Button onClick={() => navigate('/results')}>Pesquisar</Button>
        </BoxContainer>
      </Form>
      </Content>
    </Container>
  );
}

