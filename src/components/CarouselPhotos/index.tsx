import React from 'react';
import Slider from "react-slick";
import  Dance1Img  from "../../assets/dance1.jpg";
import  Dance2Img  from "../../assets/dance2.jpg";
import  Dance3Img  from "../../assets/dance3.jpg";
import  Dance4Img  from "../../assets/dance4.jpg";
import  Dance5Img  from "../../assets/dance5.jpg";
import  Dance6Img  from "../../assets/dance6.jpg";

import { CarouselContainer, Container, Title } from './styles';

export const CarouselPhotos: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  return (
    <Container>
      <Title>Fotos</Title>
      <CarouselContainer>
            <img src={Dance1Img} alt="Dance1" />
            <img src={Dance2Img} alt="Dance2" />
            <img src={Dance3Img} alt="Dance3" />
            <img src={Dance4Img} alt="Dance4" />
            <img src={Dance5Img} alt="Dance5" />
            <img src={Dance6Img} alt="Dance6" />
      </CarouselContainer>
    </Container>
  );
}

