import styled from 'styled-components';

export const Container = styled.div`
  width: 22rem;
  height: 26.5rem;
`;

export const Header = styled.div`
  width: 22rem;
  height: 3.5rem;
  border: solid 0.125rem #9E9E9E;
  background: #EDEDED;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-size: 1.5rem;
  color: #424242;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  border: solid 0.063rem #424242;
  padding: 0.75rem;

`;
export const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;

`;
export const Image = styled.img`
  width: 4rem;
  height: 4rem ;
  border-radius: 3.125rem;
`;

export const Information = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
export const NameService = styled.text`
  font-family: Montserrat, sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: #616161;
`;
export const DescriptionService = styled.div`
  font-family: Montserrat, sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: #757575;
`;
export const Button = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3.125rem;
  background: transparent;
  border: solid 0.125rem #600AED;
  transition: background-color 0.3s;

  &:hover {
    background: #600AED;

    svg {
      color: #FFFFFF;
    }
  }

  svg {
    size: 1.25rem;
    color: #600AED;
  }
`;
