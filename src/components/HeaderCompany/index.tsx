import React from 'react';
import { AiOutlineMail, AiOutlineWhatsApp, AiTwotoneStar, AiOutlineCalculator } from 'react-icons/ai';
import DancerImg from "../../assets/dancer.png";
import { BiWorld } from 'react-icons/bi';
import { BsChatLeft } from 'react-icons/bs';

import {
  Container,
  IconBusiness,
  Content,
  BusinessTitleContainer,
  Title,
  Badge,
  StarsAndTypeContainer,
  StarsContainer,
  LegendStars,
  TypeAndAddress,
  IconsContainer,
} from './styles';

export const HeaderCompany: React.FC = () => {
  return (
    <Container>
      <IconBusiness src={DancerImg} alt="Dancer" />
      <Content>
        <BusinessTitleContainer>
          <Title>Companhia de dança da Margareth</Title>
          <Badge>Aberto</Badge>
        </BusinessTitleContainer>
        <StarsAndTypeContainer>
        <StarsContainer>
          <AiTwotoneStar />
          <AiTwotoneStar />
          <AiTwotoneStar />
          <AiTwotoneStar />
          <AiTwotoneStar />
        <LegendStars>5.0</LegendStars>
        </StarsContainer>
        <TypeAndAddress>Arte e dança em Belo Horizonte </TypeAndAddress>
        </StarsAndTypeContainer>
        <IconsContainer>
          <BiWorld />
          <AiOutlineMail />
          <AiOutlineWhatsApp />
          <BsChatLeft />
          <AiOutlineCalculator />
        </IconsContainer>
      </Content>
    </Container>
  );
}

