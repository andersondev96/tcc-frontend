import React from 'react';
import { BiArrowBack, BiLogIn } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
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
  return (
    <Container>
      <Image>
        <img src={UserImage} alt="Image Start" />
      </Image>
      <LoginContainer>
        <Header>LOGIN</Header>
        <BackPage>
          <BiArrowBack />
          <a href="/">Voltar</a>
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

              <Button type="submit">
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
