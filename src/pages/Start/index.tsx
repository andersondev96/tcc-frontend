import React from 'react';
import  ImageStart  from "../../assets/image-start.png";

import {
  Container,
  Image,
  OptionsContainer,
  Text,
  ButtonsContainer,
  Button

} from './styles';

export const Start: React.FC = () => {
  return (
    <Container>
      <Image src={ImageStart} alt="Image Start" />
      <OptionsContainer>
        <Text>Faça um bom negócio e ajude um pequeno empreendedor</Text>
        <ButtonsContainer>
          <Button>Entrar</Button>
          <Button>Cadastrar</Button>
        </ButtonsContainer>
      </OptionsContainer>
    </Container>
  );
}
