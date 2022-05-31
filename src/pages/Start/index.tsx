import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  return (
    <Container>
      <Image>
        <img  src={ImageStart} alt="Image Start" />
      </Image>
      <OptionsContainer>
        <Text>Faça um bom negócio e ajude um pequeno empreendedor</Text>
        <ButtonsContainer>
          <Button onClick={() => navigate('/login')}>Entrar</Button>
          <Button>Cadastrar</Button>
        </ButtonsContainer>
      </OptionsContainer>
    </Container>
  );
}
