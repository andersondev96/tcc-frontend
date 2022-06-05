import { useNavigate } from "react-router-dom";
import  ArrowRight  from '../../assets/arrow-right-3d.svg';
import { Container, Input, Button, Image, InputContainer, AdvancedSearchContainer, AdvancedSearchText } from "./styles";

import { AdvancedSearch } from "../../pages/Clients/Business/Search/AdvancedSearch";

export const SearchInput: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <InputContainer>
        <Input type="text" placeholder="Digite o nome ou a categoria do negócio" />
        <Button type="submit">
          <Image src={ArrowRight} alt="Search" />
      </Button>
      </InputContainer>
      <AdvancedSearchContainer>
        <AdvancedSearchText onClick={() => navigate('/advanced-search')}>Pesquisa avançada</AdvancedSearchText>
        </AdvancedSearchContainer>
    </Container>

  );
}
