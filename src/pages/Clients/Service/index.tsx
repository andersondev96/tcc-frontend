import React from 'react';
import { AiTwotoneStar } from 'react-icons/ai';
import { Header } from '../../../components/Header';

import  Ballet1Img  from '../../../assets/ballet1.jpg';
import  Ballet2Img  from '../../../assets/ballet2.jpg';
import  Ballet3Img  from '../../../assets/ballet3.jpg';
import  Ballet4Img  from '../../../assets/ballet4.jpg';

import {
  Assessment,
  Container,
  Content,
  Stars,
  Title,
  TitleContainer,
  Price,
  AboutService,
  ImagesContainer,
  Images,
  Image,
  AssessmentsContainer
} from './styles';
import { Assessments } from '../../../components/Assessments';

export const Service: React.FC = () => {
  return (
    <Container>
      <Header />
      <Content>
        <TitleContainer>
          <Title>Balé</Title>
          <Stars>
            <AiTwotoneStar />
            <AiTwotoneStar />
            <AiTwotoneStar />
            <AiTwotoneStar />
            <AiTwotoneStar color="#9E9E9E" />
          </Stars>
          <Assessment>
            4.0
          </Assessment>
        </TitleContainer>
        <Price>R$ 300,00</Price>
        <AboutService>
          Balé (do francês Ballet)[1] é um estilo de dança que se originou nas cortes da
          Itália renascentista durante o século XV, e que se desenvolveu ainda mais na
          Inglaterra, Rússia e França como uma forma de dança de concerto.
          As primeiras apresentações diante da plateia eram feitas com o público
          sentado em camadas ou galerias, disposto em três lados da pista de dança.
          É um tipo de dança influente a nível mundial que possui uma forma altamente
          técnica e um vocabulário próprio. Este gênero de dança é muito difícil de
          dominar e requer muita prática. Ele é ensinado em escolas próprias em todo
          o mundo, que usam suas próprias culturas e sociedades para informar esse tipo
          de arte. As diferentes técnicas de balé, entre elas mímica e atuação, são
          coreografadas e realizadas por artistas formados e também acompanhadas
          por arranjos musicais.
        </AboutService>
        <ImagesContainer>
          Fotos
          <Images>
          <Image src={Ballet1Img} alt="Ballet 1" />
          <Image src={Ballet2Img} alt="Ballet 2" />
          <Image src={Ballet3Img} alt="Ballet 3" />
          <Image src={Ballet4Img} alt="Ballet 4" />
          </Images>
        </ImagesContainer>
          <Assessments />
      </Content>
    </Container>
  );
}
