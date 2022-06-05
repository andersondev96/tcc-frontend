import React from 'react';
import { BiArrowBack, BiLogIn } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { useNavigate  } from 'react-router-dom';
import UserImage from "../../../assets/user.png";

import {
  Container,
  Image,
  LoginContainer,
  BackPage,
  Header,
  Content,
  Form,
  InputController,
  Input,
  Label,
  ButtonController,
  Button,
  LinkForgotPassword,
  SignInGoogleButton,

} from './styles';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Image>
        <img src={UserImage} alt="Image Start" />
      </Image>
      <LoginContainer>
        <Header>LOGIN</Header>
        <BackPage onClick={() => navigate('/start')}>
          <BiArrowBack />
          Voltar
          </BackPage>
        <Content>
          <Form>
            <InputController>
              <Label htmlFor="inputEmail">E-mail</Label>
              <Input type="text" name="email" placeholder="Digite o seu e-mail" />
            </InputController>

            <InputController>
              <Label htmlFor="inputEmail">Senha</Label>
              <Input type="password" name="email" placeholder="Digite a sua senha" />
            </InputController>

            <ButtonController>

              <Button type="submit" onClick={() => navigate('/')}>
              <BiLogIn />
                Entrar
              </Button>
            </ButtonController>
          </Form>

          <LinkForgotPassword>Esqueci a senha</LinkForgotPassword>
          <SignInGoogleButton>
            <FcGoogle />
            Entrar com o Google
            </SignInGoogleButton>
        </Content>
      </LoginContainer>
    </Container>
  );
}
