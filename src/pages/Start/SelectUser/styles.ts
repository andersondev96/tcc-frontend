import styled from 'styled-components';

export const Container = styled.div`
  max-width: 100vw;
  padding: 2.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const BackPage = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  align-items: center;
  padding: 0.5rem;
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  color: #547DE5;
  cursor: pointer;
`;

export const Content = styled.div`
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Text = styled.div`
  font-family: Inter, sans-serif;
  font-style: Italic;
  font-weight: 500;
  font-size: 2rem;
`;

export const UsersTypeContainer = styled.div`
  margin-top: 3.5rem;
  display: flex;
  flex-direction: row;
  gap: 12.5rem;
`;

export const Element = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Image = styled.img`
  width: 11.875rem;
  height: 16.25rem;
`;

export const RadioContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;


`;

export const Radio = styled.input`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`;

export const Label = styled.label`
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-size: 1.25rem;
`;

export const Button = styled.button`
  margin-top: 2.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  width: 10rem;
  height: 3rem;
  border: none;
  border-radius: 0.25rem;
  background: #478AD8;

  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 1.125rem;
  color: #FFFFFF;
  transition: filter 0.3s;

  :hover {
    filter: brightness(0.9);
  }
`;


