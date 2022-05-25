import { BusinessListing } from "../../../components/BusinessListing";
import { Header } from "../../../components/Header";
import { SearchInput } from "../../../components/SearchInput";
import { Container, Content } from "./styles";

export const Home: React.FC = () => {
  return (
    <Container>
      <Header />
      <Content>
        <SearchInput />
        <BusinessListing />
      </Content>
    </Container>
  );
};
