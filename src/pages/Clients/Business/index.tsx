import React from 'react';
import { Assessments } from '../../../components/Assessments';
import{ BoxServices } from '../../../components/BoxServices';
import { CarouselPhotos } from '../../../components/CarouselPhotos';
import { Header } from '../../../components/Header';
import { HeaderCompany } from '../../../components/HeaderCompany';

import { Container, Content, Main, Section, TitleSection, Text, SectionsWithTextContainer, BoxContainer } from './styles';

export const Business: React.FC = () => {
  return (
    <Container>
      <Header />
      <HeaderCompany />
      <Content>
        <Main>
        <SectionsWithTextContainer>
          <Section>
            <TitleSection>Sobre o negócio:</TitleSection>
            <Text>
              A comphania de dança da Margareth é uma organização que
              oferece aulas de dança para todas as faixas etárias e é
              reconhecida pelo seu sucesso em toda à cidade.
              Há 10 anos no mercado oferece serviços de qualidade,
              contando com profissionais super qualificados e atenciosos,
              prontos para prestar um ótimo atendimento ao aluno.
            </Text>
          </Section>

          <Section>
            <TitleSection>Serviços oferecidos:</TitleSection>
            <Text>Dança / Treinamento corporal / Coordenação motora </Text>
          </Section>

          <Section>
            <TitleSection>Endereço</TitleSection>
            <Text>Rua José Caetano, 105, Centro, Belo Horizonte - MG</Text>
          </Section>

          <Section>
            <TitleSection>Horário de funcionamento</TitleSection>
            <Text>SEG À SEX: 09:00-12:00 14:00 19:00</Text>
            <Text>SÁB: Fechado</Text>
            <Text>DOM: Fechado</Text>
          </Section>

          <Section>
            <TitleSection>Telefone</TitleSection>
            <Text>(31) 45145-1451</Text>
          </Section>
        </SectionsWithTextContainer>
        <BoxContainer>
          <BoxServices />
        </BoxContainer>
      </Main>
      <CarouselPhotos />
      <Assessments />
      </Content>
    </Container>
  )
}
