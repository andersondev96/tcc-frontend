import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

`;

export const Header = styled.div`
  width: 100%;
  height: 3rem;
  padding: 1.75rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #547DE5;
  transition: filter 0.3s;

  svg {
    font-size: 1.25rem;
    color: #FFFFFF;

    :hover {
      filter: brightness(0.9);
      cursor: pointer;
    }
  }

`;

export const Title = styled.p`
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 1.375rem;
  color: #FFFFFF;
`;

export const Body = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

export const Description = styled.div`
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-size: 1.15rem;
`;

export const Form = styled.form`
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
`;

export const FormControl = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Legend = styled.div`
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  color: #547DE6;
`;

export const Input = styled.input`
  height: 2.25rem;
  border-radius: 0.25rem;
  border: solid 0.063rem #000000;
  padding: 0.5rem;

  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 0.85rem;
`;

export const Select = styled.select`
  height: 2.25rem;
  background: transparent;
  border: solid 0.063rem #000000;
  border-radius: 0.25rem;
  padding: 0.5rem;

  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 0.85rem;
`;

export const Textarea = styled.textarea`
  height: 4.5rem;
  border: solid 0.063rem #000000;
  border-radius: 0.25rem;
  resize: none;
  padding: 1rem;

  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 0.85rem;
`;

export const FileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;

`;

export const FileButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  border: solid 0.125rem #547DE5;
  background: none;
  height: 2rem;
  width: 11.875rem;
  padding: 0.5rem;
  cursor: pointer;

  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  color: #547DE5;
  transition: background-color 0.3s ;

  :hover {
    background: #547DE5;
    color: #FFFFFF;
  }

`;

export const File = styled.input`
  display: none;
`;

export const FileDescription = styled.div``;

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
