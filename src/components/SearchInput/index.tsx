import { Container, Input, Button, Image, InputContainer, AdvancedSearch, AdvancedSearchText } from "./styles";
import  ArrowRight  from '../../assets/arrow-right-3d.svg';

export const SearchInput: React.FC = () => {
  return (
    <Container>
      <InputContainer>
        <Input type="text" placeholder="Digite o nome ou a categoria do negócio" />
        <Button type="submit">
          <Image src={ArrowRight} alt="Search" />
      </Button>
      </InputContainer>
      <AdvancedSearch>
        <AdvancedSearchText href="/">Pesquisa avançada</AdvancedSearchText>
        </AdvancedSearch>
    </Container>

  );
}
