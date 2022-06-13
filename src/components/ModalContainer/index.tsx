import React from 'react';
import Modal from "react-modal";
import { AiOutlineClose, AiOutlinePaperClip } from "react-icons/ai";

import {
  Container,
  Header,
  Title,
  Body,
  Description,
  Form,
  FormRow,
  FormControl,
  Legend,
  Input,
  Select,
  Textarea,
  FileContainer,
  FileButton,
  File,
  FileDescription,
  Button

} from './styles';
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface IModalContainerProps {
  isOpen: boolean;
  onRequestClose: () => void;
}



const ModalContainer: React.FC<IModalContainerProps> = ({
  isOpen,
  onRequestClose,
}) => {

  const currentStyles = {
    content: {
      width: '900px',
      height: '600px',
      margin: 'auto',
      padding: 0,

    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={currentStyles}
    >

      <Container>
      <Header>
        <Title>Solicitar orçamento</Title>
        <AiOutlineCloseCircle onClick={onRequestClose} />
      </Header>
      <Body>
        <Description>Por favor, preencha os campos abaixo</Description>
        <Form>
          <FormRow>
            <FormControl>
              <Legend>Nome completo</Legend>
              <Input type="text" name="name" />
            </FormControl>

            <FormControl>
              <Legend>CPF</Legend>
              <Input type="cpf" name="name" />
            </FormControl>
          </FormRow>
          <FormRow>
          <FormControl>
              <Legend>E-mail</Legend>
              <Input type="email" name="email" />
            </FormControl>

            <FormControl>
              <Legend>Telefone</Legend>
              <Input type="text" name="telephone" />
            </FormControl>
          </FormRow>
          <FormRow>
          <FormControl>
              <Legend>Objetivo do serviço</Legend>
              <Input type="text" name="objective" />
            </FormControl>

            <FormControl>
              <Legend>Tipo de serviço</Legend>
              <Select name="type">
                <option value="">Selecione uma opção</option>
              </Select>
            </FormControl>

            <FormControl>
              <Legend>Categoria do serviço</Legend>
              <Select name="category">
                <option value="">Selecione uma opção</option>
              </Select>
            </FormControl>
          </FormRow>
          <FormRow>
            <FormControl>
              <Legend>Descrição do serviço</Legend>
              <Textarea/>
            </FormControl>
          </FormRow>
          <FormRow>
            <FormControl>
              <FileContainer>
                <FileButton>Adicionar Arquivos</FileButton>
                <File type="file" className="input-file"/>
                  <AiOutlinePaperClip />
                  <AiOutlineClose />
              </FileContainer>
            </FormControl>
          </FormRow>
          <FormRow>
            <Button>Enviar solicitação</Button>
          </FormRow>
        </Form>
      </Body>
      </Container>

    </Modal>
  )
}

export default ModalContainer;
