import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 3.75rem;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.563rem;
`;
export const IconUser = styled.div`
  svg {
    font-size: 3.25rem;
    color: #C4C4C4;
  }
`;
export const TextArea = styled.textarea`
  width: 36rem;
  height: 8.125rem;
  border: solid 0.125rem #616161;
  border-radius: 0.25rem;
  resize: none;
  padding: 1rem;

  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 0,75rem;
  color: #757575;
`;

export const StarsContainer = styled.div`
  margin-top: 2rem;
  margin-left: 5rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
export const Legend = styled.div`
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  color: #424242;

`;
export const Stars = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.375rem;

  svg {
    color: #9E9E9E;
    font-size: 1rem;
    cursor: pointer;
    transition: color 0.3s;

    :hover {
      color: #2F5AC7;
    }

  }

`;
export const Button = styled.button`
  margin-top: 2.5rem;
  margin-left: 5rem;

  width: 8rem;
  height: 3.125rem;
  border: none;
  background: #547DE5;
  border-radius: 0.25rem;

  font-family: Inter, sans-serif;
  font-size: 1.25rem;
  font-weight: 400;
  color: #FFFFFF;
  transition: filter 0.3s;

  :hover {
    filter: brightness(0.9);
  }
`;
