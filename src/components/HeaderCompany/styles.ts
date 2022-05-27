import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3rem;

  padding: 0.375rem 10.5rem;
  margin-top: 2.25rem;
  background: rgba(252, 252, 252, 0.9);

`;

export const IconBusiness = styled.img`
  width: 4rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BusinessTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
`;

export const Title = styled.div`
  font-family: Inter, sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: #424242;
`;

export const Badge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3.125rem;
  width: 3.75rem;
  height: 1.125rem;
  background: #08A358;
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 0.625rem;
  color: #FCFCFC;
`;

export const StarsAndTypeContainer = styled.div`
  margin-top: 0.313rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10.88rem;

`;

export const StarsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.375rem;

  svg {
    color: #2F5AC7;
    font-size: 1rem;
  }
`;

export const LegendStars = styled.div`
  font-family: Inter, sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: #424242;
`;

export const TypeAndAddress = styled.div`
  font-family: Inter, sans-serif;
  font-size: 0.75rem;
  font-weight: 40;
  color: #000000;
`;

export const IconsContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2.25rem;

  transition: filter 0.3s;

  svg {
    font-size: 2rem;
    color: red;

    :nth-child(1) {
        color: #4072F3;
      }

      :nth-child(2) {
        color: #547DE5;
      }

      :nth-child(3) {
        color: #1EBF1B;
      }

      :nth-child(4) {
        color: #EB1B2E;
      }

      :nth-child(5) {
        color: #28267C;
      }

      :hover {
        cursor: pointer;
        filter: brightness(0.8);
      }

  }
`;
