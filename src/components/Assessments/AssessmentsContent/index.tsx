import React from 'react';

import { AiTwotoneStar } from 'react-icons/ai';
import  WomenImg  from "../../../assets/women.jpg"

import { Container, Photo, Comment, Stars, Text } from './styles';

export const AssessmentsContent: React.FC = () => {
  return (
    <Container>
          <Photo>
            <img src={WomenImg} alt="Women" />
          </Photo>
          <Comment>
            <Stars>
              <AiTwotoneStar />
              <AiTwotoneStar />
              <AiTwotoneStar />
              <AiTwotoneStar color="#9E9E9E" />
              <AiTwotoneStar color="#9E9E9E" />
            </Stars>
            <Text>Serviço muito bom, mas deixa a desejar.</Text>
          </Comment>
        </Container>
  );
}

