import styled from 'styled-components';

export const Container = styled.div`
  max-width: 100vw;
  height: 2.5rem;
  padding: 0.4rem;
  background: #547DE5;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonBack = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;

  background: transparent;
  border: none;

  svg {
    color: #ffffff;
    transition: filter 0.3s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export const UserMenu = styled.div`
  padding: 1.6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  transition: filter 0.3s;

  svg {
    color: #ffffff;
  }

  &:hover {
    filter: brightness(0.9);
  }
`;

export const Text = styled.div`
  font-family: Inter, sans-serif;
  font-weight: 400;
  color: #ffffff;
`;

