import styled from 'styled-components';

export const Container = styled.div`
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
