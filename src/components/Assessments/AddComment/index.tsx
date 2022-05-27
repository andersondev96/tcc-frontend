import React from 'react';
import { AiTwotoneStar } from 'react-icons/ai';
import { FaUserCircle } from "react-icons/fa";

import {
  Container,
  FormContainer,
  IconUser,
  TextArea,
  StarsContainer,
  Legend,
  Stars,
  Button,
} from './styles';

export const AddComment: React.FC = () => {
  return (
    <Container>
      <FormContainer>
        <IconUser>
          <FaUserCircle />
        </IconUser>
        <TextArea placeholder="Escreva aqui o seu comentário"/>
      </FormContainer>
      <StarsContainer>
        <Legend>Classificação</Legend>
        <Stars>
        <AiTwotoneStar />
        <AiTwotoneStar />
        <AiTwotoneStar />
        <AiTwotoneStar />
        <AiTwotoneStar />
        </Stars>
      </StarsContainer>
      <Button>Enviar</Button>
    </Container>
  )
}
