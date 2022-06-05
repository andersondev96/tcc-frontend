import styled from 'styled-components';

export const Container = styled.div`
  padding: 4.25rem;
  display: flex;
  flex-direction: column;
`;

export const BackPage = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  align-items: center;
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: #547DE5;
  cursor: pointer;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem 17.75rem;
  background: #D9ECFE;

  display: flex;
  flex-direction: column;
`;

export const  Title = styled.div`
  font-family: InputContainer, sans-serif;
  font-weight: 500;
  font-size: 1.75rem;
  color: #757575;
`;

export const Form = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Legend = styled.p`
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  font-size: 0.8rem;
`;

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Select = styled.select`
  width: 25rem;
  height: 2.5rem;
  padding: 0.5rem;
  border-radius: 0.25rem;

  font-family: Montserrat, sans-serif;
  font-weight: 300;
  font-size: 0.875rem;
  color: #757575;
`;

export const Button = styled.button`
  width: 10rem;
  height: 2.75rem;
  border: none;
  border-radius: 0.25rem;
  background: #4474F0;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 1.25rem;
  color: #FFFFFF;
  transition: filter 0.3s ;

  :hover {
    filter: brightness(0.9);
  }
`;
