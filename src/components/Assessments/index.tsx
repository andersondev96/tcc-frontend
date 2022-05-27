import React from 'react';
import { AddComment } from './AddComment';
import { AssessmentsContent } from './AssessmentsContent';

import {
  Container,
  Header,
  Title,
  ContComments,
  Content
} from './styles';

export const Assessments: React.FC = () => {
  return (
    <Container>
      <Header>
        <Title>Avaliações</Title>
        <ContComments>16 comentários</ContComments>
      </Header>
      <Content>
        <AssessmentsContent />
        <AssessmentsContent />
        <AssessmentsContent />
      </Content>
      <AddComment />
    </Container>
  )
}
