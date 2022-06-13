import React, { ChangeEvent, useCallback, useState } from 'react';
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
  ButtonContainer,
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
      height: '620px',
      margin: 'auto',
      padding: 0,

    }
  }

  const [selectedFile, setSelectedFile] = useState("");

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setSelectedFile(e.target.files[0].name);
      }
    }, []);

    const handleDeleteFile = useCallback(() => {
        setSelectedFile("");
    }, []);

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
                <Textarea />
              </FormControl>
            </FormRow>
            <FormRow>
              <FormControl>
                <FileContainer>
                  <FileButton>
                    <File type="file" className="input-file" onChange={handleFileChange} />
                    <span>Adicionar arquivos</span>
                  </FileButton>
                  {selectedFile && (
                    <FileDescription>
                      < AiOutlinePaperClip />
                      {selectedFile ? selectedFile : ''}
                      <AiOutlineClose onClick={handleDeleteFile} />
                    </FileDescription>
                    )
                  }
                </FileContainer>
              </FormControl>
            </FormRow>
            <ButtonContainer>
              <Button>Enviar solicitação</Button>
            </ButtonContainer>
          </Form>
        </Body>
      </Container>

    </Modal>
  )
}

export default ModalContainer;
