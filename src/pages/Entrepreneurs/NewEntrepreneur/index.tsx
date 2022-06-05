import React from 'react';
import { AiOutlineSave } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  BackPage,
  Main,
  FormContainer,
  HeaderForm,
  Title,
  Content,
  Legend,
  Form,
  FormRow,
  FormGroup,
  Label,
  Input,
  Select,
  ButtonContainer,
  Button
} from './styles';

export const NewEntrepreneur: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <BackPage onClick={() => navigate('/start/select')}>
        <BiArrowBack />
        Voltar
      </BackPage>
      <Main>
        <FormContainer>
          <HeaderForm>
            <Title>Cadastrar negócio</Title>
          </HeaderForm>
          <Content>
            <Legend>Para começar insira as suas informações pessoais</Legend>
            <Form>
              <FormRow>
                <FormGroup>
                  <Label>Nome completo</Label>
                  <Input name="name" placeholder="Digite o seu nome" />
                </FormGroup>

                <FormGroup>
                  <Label>CPF</Label>
                  <Input name="cpf" placeholder="Digite o seu CPF" />
                </FormGroup>

                <FormGroup>
                  <Label>Telefone</Label>
                  <Input name="telephone" placeholder="Digite o seu telefone" />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>Endereço</Label>
                  <Input name="address" placeholder="Digite o endereço" />
                </FormGroup>

                <FormGroup>
                  <Label>Bairro</Label>
                  <Input name="district" placeholder="Digite o bairro" />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>Número</Label>
                  <Input name="number" />
                </FormGroup>

                <FormGroup>
                  <Label>CEP</Label>
                  <Input name="zip_code" />
                </FormGroup>

                <FormGroup>
                  <Label>Estado</Label>
                  <Select>
                    <option value="">Estados</option>
                    <option value="">Estados</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>Cidade</Label>
                  <Input name="city" />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>E-mail</Label>
                  <Input name="email" placeholder="Informe o seu e-mail" />
                </FormGroup>

                <FormGroup>
                  <Label>Senha</Label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Digite uma sua senha"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Confirmar senha</Label>
                  <Input name="password_confirmation"
                    type="password"
                    placeholder="Confirme a sua senha"
                  />
                </FormGroup>
              </FormRow>

              <ButtonContainer>
                <Button>
                  <AiOutlineSave />
                  SALVAR
                </Button>
              </ButtonContainer>

            </Form>
          </Content>
        </FormContainer>
      </Main>
    </Container>
  );
}
