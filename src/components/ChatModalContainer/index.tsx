import React, { ChangeEvent, useCallback, useState } from 'react';
import Modal from "react-modal";
import { FaUserCircle } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

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
  ButtonContainer,
  Button,
  ContentMessages,
  MessagesContainer,
  MessageContainer,
  UserProfile,
  UserName,
  Message,
  InputMessageContainer,
  InputMessage

} from './styles';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsChatLeft } from 'react-icons/bs';

interface IChatModalContainerProps {
  isOpen: boolean;
  onRequestClose: () => void;
}



export const ChatModalContainer: React.FC<IChatModalContainerProps> = ({
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

  const [showInsertData, setShowInsertData] = useState(true);
  const [showMessages, setShowMessages] = useState(false);

  const handleStartChat = useCallback(() => {
    setShowInsertData(false);
    setShowMessages(true);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={currentStyles}
    >

      <Container>
        <Header>
          <Title>Chat online</Title>
          <AiOutlineCloseCircle onClick={onRequestClose} />
        </Header>
        <Body>
          {
            showInsertData ? (
              <>
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
                      <Legend>Motivo do contato</Legend>
                      <Select name="type">
                        <option value="">Selecione uma opção</option>
                      </Select>
                    </FormControl>

                  </FormRow>
                  <FormRow>
                    <FormControl>
                      <Legend>Descrição detalhada sobre motivo do contato</Legend>
                      <Textarea />
                    </FormControl>
                  </FormRow>

                  <ButtonContainer>
                    <Button onClick={handleStartChat}>
                      <BsChatLeft />
                      Iniciar chat
                    </Button>
                  </ButtonContainer>
                </Form>
              </>
            ) : (
              <>
              <ContentMessages>
              <MessagesContainer>
                  <MessageContainer>
                    <UserProfile>
                      <FaUserCircle />
                    </UserProfile>
                    <UserName>Atendente:</UserName>
                    <Message>Bom dia, como posso ajudar?</Message>
                  </MessageContainer>

                  <MessageContainer>
                    <UserProfile>
                      <FaUserCircle />
                    </UserProfile>
                    <UserName>Atendente:</UserName>
                    <Message>Bom dia, como posso ajudar?</Message>
                  </MessageContainer>

                </MessagesContainer>



                <InputMessageContainer>
                  <InputMessage placeholder="Digite a sua mensagem" />
                  <FiSend />
                </InputMessageContainer>
              </ContentMessages>


              </>
            )
          }
        </Body>
      </Container>

    </Modal>
  )
}

