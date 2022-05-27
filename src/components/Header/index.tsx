import React from "react";
import { useNavigate  } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineUser } from "react-icons/ai";


import { Container, ButtonBack, UserMenu, Text } from "./styles";

export const Header: React.FC = () => {
  const navigate = useNavigate();

  function returnToBackPage() {
    navigate('/');
  }

  return (
    <Container>
      <ButtonBack onClick={returnToBackPage}>
      <AiOutlineArrowLeft />
      </ButtonBack>
      <UserMenu>
        <AiOutlineUser />
        <Text>Entrar</Text>
      </UserMenu>
    </Container>
  );
}
