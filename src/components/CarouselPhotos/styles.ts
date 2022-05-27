import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.text`
  font-family: Inter, sans-serif;
  font-weight: 500;
  color: #424242;
`;

export const CarouselContainer = styled.div`
  max-width: 100vw;
  display: flex;
  flex-direction: row;
  gap: 2rem;

  img {
    width: 5rem;
    height: 5rem;
    border-radius: 3.125rem;
  }

`;
