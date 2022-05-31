import styled from 'styled-components';

export const Container = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  gap: 2.25rem;
`;

export const Image = styled.div`
  display: flex;

  img {
    width: 27.25rem;
    height: 37.438rem;
  }
`;

export const OptionsContainer = styled.div`
  padding: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8.5rem;
`;

export const Text = styled.text`
  font-family: Inter, sans-serif;
  font-style: italic;
  font-weight: 500;
  font-size: 3.5rem;
  color: #000000;
  text-align: center;
  text-shadow: 0.313rem 0.313rem 0.313rem rgba(0, 0, 0, 0.125);
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
    transition: background-color 0.3s ;

    :hover {
      border: 0.063rem solid #478AD8;
      background: transparent;
      color: #478AD8;
    }
  }

  :last-child {
    border: 0.063rem solid #478AD8;
    background: transparent;
    color: #478AD8;
    transition: background-color 0.3s ;

    :hover {
      border: none;
      background: #478AD8;
      color: #FFFFFF;
    }
  }
`;
