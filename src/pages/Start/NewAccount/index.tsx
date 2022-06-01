import React from 'react';
import { AiOutlineSave } from 'react-icons/ai';
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
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

export const NewAccount: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Image>
        <img src={UserImage} alt="Image Start" />
      </Image>
      <LoginContainer>
        <Header>NOVO USUÁRIO</Header>
        <BackPage onClick={() => navigate('/select')}>
          <BiArrowBack />
          Voltar
        </BackPage>
        <Content>
          <Form>
          <InputController>
              <Label htmlFor="inputNome">Nome</Label>
              <Input type="text" name="nome" placeholder="Digite o seu nome" />
            </InputController>

            <InputController>
              <Label htmlFor="inputEmail">E-mail</Label>
              <Input type="text" name="email" placeholder="Digite o seu e-mail" />
            </InputController>

            <InputController>
              <Label htmlFor="inputEmail">Senha</Label>
              <Input type="password" name="email" placeholder="Digite a sua senha" />
            </InputController>

            <InputController>
              <Label htmlFor="inputPasswordConfirmation">Confirmar senha</Label>
              <Input type="password" name="passwordConfirmation" placeholder="Digite a sua senha" />
            </InputController>

            <ButtonController>

              <Button type="submit">
              <AiOutlineSave />
                Salvar
              </Button>
            </ButtonController>
          </Form>


        </Content>
      </LoginContainer>
    </Container>
  );
}
