import React from 'react';
import { SearchInput } from '../../../components/SearchInput';

import {
  Container,
  Content,
  Title,
  SearchContainer,
} from './styles';

export const Home: React.FC = () => {
  return (
    <Container>
      <Content>
        <Title>Que negócio você está procurando?</Title>
        <SearchContainer>
          <SearchInput />
        </SearchContainer>
      </Content>
    </Container>
  );
}

export default Home;
