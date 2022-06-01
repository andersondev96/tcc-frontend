import React, { useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import Client from "../../../assets/client.png";
import  Entrepreneur  from "../../../assets/entrepreneur.png";

import {
  Container,
  BackPage,
  Content,
  Text,
  UsersTypeContainer,
  Element,
  Image,
  RadioContainer,
  Radio,
  Label,
  Button
} from './styles';

export const SelectUser: React.FC = () => {
  const navigate = useNavigate();

  const [typeUser, setTypeUser] = useState('');

  function redirectToNextPage() {
    if (typeUser === 'Empreendedor') {
      navigate('/new-entrepreneur')
    } else {
      navigate('/new-user');
    }
  }

  return (
    <Container>
      <BackPage onClick={() => navigate('/start')}>
        <BiArrowBack />
        Voltar
      </BackPage>
      <Content>
        <Text>Selecione que tipo de pessoa você é</Text>
        <UsersTypeContainer>
          <Element>
            <Image src={Entrepreneur} alt="Entrepreneur" />
            <RadioContainer>
              <Radio
                type="radio"
                name="type"
                onChange={() => setTypeUser('Empreendedor')}
              />
              <Label>Empreendedor</Label>
            </RadioContainer>
          </Element>

            <Element>
              <Image src={Client} alt="Client" />
              <RadioContainer>
              <Radio
                type="radio"
                name="type"
                onChange={() => setTypeUser('Cliente')}
              />
              <Label>Cliente</Label>
              </RadioContainer>
            </Element>
          </UsersTypeContainer>

            <Button onClick={redirectToNextPage}>
              AVANÇAR
              <AiOutlineArrowRight />
            </Button>

        </Content>
      </Container>
  );
}
