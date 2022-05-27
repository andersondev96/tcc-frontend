import React from 'react';
import { AiOutlineRight } from "react-icons/ai";
import  BalletImg  from '../../../assets/ballet.jpg';

import {
  Container,
  Image,
  Information,
  NameService,
  DescriptionService,
  Button } from './styles';

export const Item: React.FC = () => {
  return (
    <Container>
      <Image src={BalletImg} alt="Ballet" />
          <Information>
          <NameService>Balé</NameService>
          <DescriptionService>A partir de R$ 300,00</DescriptionService>
          </Information>
          <Button>
              <AiOutlineRight />
          </Button>
    </Container>
  );
}

