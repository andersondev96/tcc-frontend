import styled from 'styled-components';

export const Container = styled.div`
  padding: 3.5rem 0;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  gap: 14rem;
`;

export const Image = styled.div`
  img {
    width: 20rem;
    height: 31.5rem;
  }
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
  height: 32.188rem;
  background: #FFF9F9;
  border: 0.063rem solid #F4EFEF;
  border-radius: 0.25rem;

`;

export const BackPage = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  align-items: center;
  padding: 0.5rem;
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 0.75rem;
  color: #547DE5;


  a {
    text-decoration: none;
    color: #547DE5;
  }
`;

export const Header = styled.div`
  width: 30.063rem;
  height: 1.75rem;
  background: #547DE5;
  border-radius: 0.25rem 0.25rem 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2rem;

  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  color: #FFFFFF;
`;

export const Content = styled.div`
  padding: 1.25rem 3.75rem;
  display: flex;
  flex-direction: column;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

export const InputController = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Label = styled.label`
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  color: #547DE6;
`;
export const Input = styled.input`
  background: #F4EFEF;
  border: 0.063rem solid #000000;
  border-radius: 0.25rem;
  padding: 1.5rem;

  width: 21.875rem;
  height: 2.5rem;

  font-family: Montserrat, sans-serif;
  font-weight: 600;
  color: #000000;
`;
export const ButtonController = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const Button = styled.button`
  width: 10rem;
  height: 2.5rem;
  border: none;
  border-radius: 0.25rem;
  background: #478AD8;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
  justify-content: center;

  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 1.25rem;
  color: #FFFFFF;
  transition: filter 0.3s;

  :hover {
    filter: brightness(0.9);
  }
`;

export const LinkForgotPassword = styled.a`
  color: #7184EA;
  width: 7rem;
  margin-top: 1.5rem;
  text-decoration: none;
  font-family: Montserrat, sans-serif;
  font-weight: 300;
  font-size: 0.875rem;
  transition: text-decoration 0.3s ;

  :hover {
    cursor: pointer;
    text-decoration: underline;

  }
`;

export const SignInGoogleButton = styled.button`
  margin-top: 2.125rem;
  height: 1.313rem;
  width: 14.563rem;

  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  border: none;
  background: transparent;

  font-family: Montserrat, sans-serif;
  font-weight: 600;
`
