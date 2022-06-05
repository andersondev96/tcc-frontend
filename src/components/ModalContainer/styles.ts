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
