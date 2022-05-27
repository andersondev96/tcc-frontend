import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.125rem;
`;

export const Photo = styled.div`

  img {
    width: 2.625rem;
    height: 2.625rem;
    object-fit: cover;
    border-radius: 3.125rem;
  }
`;
export const Comment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const Stars = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.375rem;

  svg {
    color: #2F5AC7;
    font-size: 1rem;
  }

`;
export const Text = styled.text`
  font-family: Inter, sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
`;
