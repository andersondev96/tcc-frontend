import styled from 'styled-components';

export const Container = styled.div`
  padding: 6.25rem;
  display: flex;
  flex-direction: row;
  gap: 2.25rem;
`;

export const Image = styled.img`
  width: 28.5rem;
  height: 26.563rem;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8.5rem;
`;

export const Text = styled.div`
  font-family: Inter, sans-serif;
  font-style: italic;
  font-weight: 500;
  font-size: 3.5rem;
  color: #000000;
  text-align: center;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4rem;
`;

export const Button = styled.button`
  width: 10rem;
  height: 3.125rem;
  border-radius: 0.25rem;

  :first-child {
    border: none;
    background: #478AD8;
    color: #FFFFFF;
  }

  :last-child {
    border: 0.063rem solid #478AD8;
    background: transparent;
    color: #478AD8;
  }
`;
