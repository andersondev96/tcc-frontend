import { AiOutlineArrowLeft, AiOutlineUser } from "react-icons/ai";

import { Container, ButtonBack, UserMenu, Text } from "./styles";

export const Header: React.FC = () => {
  return (
    <Container>
      <ButtonBack>
      <AiOutlineArrowLeft />
      </ButtonBack>
      <UserMenu>
        <AiOutlineUser />
        <Text>Entrar</Text>
      </UserMenu>
    </Container>
  );
}
