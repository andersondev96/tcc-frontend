import React from 'react';
import Modal from "react-modal";


import { Container, Header, Title } from './styles';
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
      </Container>

    </Modal>
  )
}

export default ModalContainer;
