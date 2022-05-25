import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputContainer = styled.div`
  padding-top: 3.125rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Input = styled.input`
  position: relative;
  width: 20rem;
  height: 2.5rem;
  padding: 1.25rem;

  font-weight: 400;
  font-size: 0.85rem;
  color: #424242;

  border: solid 0.063rem #000000;
  border-radius: 0.25rem;

  &::placeholder {
    color: #757575;
  }
`;

export const Button = styled.button`
  position: absolute;

  display: flex;
  align-items: center;
  margin-left: 18rem;
  background: transparent;
  border: none;

`;

export const Image = styled.img`
  height: 1.4rem;
`;

export const AdvancedSearch = styled.div`
  margin-top: 0.5rem;
`;

export const AdvancedSearchText = styled.a`
  font-weight: 300;
  font-size: 0.875rem;
  color: #547DE5;
  cursor: pointer;
  text-decoration: none;
  transition: filter 0.3s;

  &:hover {
    filter: brightness(0.6);
  }
`;


