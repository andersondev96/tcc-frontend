import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.75rem;
`;

export const BackPage = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  align-items: center;
  padding-left: 2.5rem;
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: #547DE5;
  cursor: pointer;
`;

export const Main = styled.div`
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 77.5rem;
  background: #F4EFEF;
  border-radius: 0.25rem;

`;
export const HeaderForm = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  background: #547DE6;
  border-radius: 0.25rem 0.25rem 0 0;
`;

export const Title = styled.div`
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  color: #FFFFFF;
`;
export const Content = styled.div`
  padding: 0.75rem;

`;
export const Legend = styled.div`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 0.9rem;
`;

export const Form = styled.form`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;
export const FormRow = styled.div`
  display: grid;
  gap: 2rem;
  max-width: 76rem;

  :nth-child(1) {
    grid-template-columns: 2fr 1fr 1fr;
  }

  :nth-child(2) {
    grid-template-columns: 1fr 1fr;
  }

  :nth-child(3) {
    grid-template-columns: 1fr 2fr 1fr 2fr;
  }

  :nth-child(4) {
    grid-template-columns: 2fr 1fr 1fr;
  }

`;
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

`;
export const Label = styled.label`
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  color: #547DE6;
`;

export const Input = styled.input`
  height: 2.5rem;
  background: transparent;
  border: solid 0.063rem #000000;
  border-radius: 0.25rem;
  padding: 0.75rem;

  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 0.85rem;
`;

export const Select = styled.select`
  height: 2.5rem;
  background: transparent;
  border: solid 0.063rem #000000;
  border-radius: 0.25rem;
  padding: 0.75rem;

  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 0.85rem;

`;

export const ButtonContainer = styled.div`
  margin-top: 1.25rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  width: 16.25rem;
  height: 2.5rem;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.25rem;
  background: #478AD8;

  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  color: #FFFFFF;

  transition: filter 0.3s;

  :hover {
    filter: brightness(0.9);
  }

`;
