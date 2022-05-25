import React from 'react';
import { AiOutlineWhatsApp, AiOutlineMail } from 'react-icons/ai';
import { BsChatLeft } from 'react-icons/bs';
import  DanceImg  from '../../../assets/dance.jpg'
import {
  Container,
  BusinessInfo,
  Image,
  BusinessHeader,
  Title,
  Status,
  OwnerName,
  TypeBusiness,
  Address,
  BusinessIcons
 } from './styles';

export const Item: React.FC = () => {
  return (
    <Container>
        <Image src={DanceImg} />
        <BusinessInfo>
          <BusinessHeader>
            <Title>Companhia de dança Margareth</Title>
            <Status />
          </BusinessHeader>
            <OwnerName>Margareth Souza</OwnerName>
            <TypeBusiness>Arte e dança</TypeBusiness>
            <Address>Rua José Caetano, 105, Belo Horizonte - MG</Address>
        </BusinessInfo>

        <BusinessIcons>
          <AiOutlineWhatsApp />
          <AiOutlineMail />
          <BsChatLeft />
        </BusinessIcons>
      </Container>
  );
}

