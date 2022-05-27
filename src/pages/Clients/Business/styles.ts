import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 64rem;
  margin-left: 10.5rem;
  padding: 2.5rem;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SectionsWithTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const Section = styled.div`
  :first-child {
    margin-top: 4rem;
  }


  display: flex;
  flex-direction: column;
`;

export const TitleSection = styled.div`
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 1rem;
  color: #424242;
`;

export const Text = styled.div`
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: #000000;
`;

export const BoxContainer = styled.div`
  margin-left: 2.5rem;
`;

export const DaysOfWeek = styled.div``;

export const Hours = styled.div``;
