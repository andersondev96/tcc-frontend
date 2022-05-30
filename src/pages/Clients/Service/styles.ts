import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  margin: 4rem;
  margin-left: 10.5rem;
  display: flex;
  flex-direction: column;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.text`
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 1.75rem;
  color: #424242;
`;

export const Stars = styled.div`
  margin-left: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.375rem;

  svg {
    color: #2F5AC7;
  }
`;

export const Assessment = styled.div`
  margin-left: 0.75rem;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 0.625rem;
  color: #424242;
`;

export const Price = styled.div`
  margin-top: 0.5rem;
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  font-size: 0.75rem;
  color: #600AED;
`;

export const AboutService = styled.div`
  margin-top: 1.5rem;
  max-width: 63.75rem;
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 1.125rem;
  color: #000000;
`;

export const ImagesContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.375rem;
`;

export const Images = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
`;

export const Image = styled.img`
  width: 9.375rem;
  height: 6.25rem;
  object-fit: cover;
  border-radius: 0.25rem;
`;

export const AssessmentsContainer = styled.div`
  margin-top: 4rem;
`;
