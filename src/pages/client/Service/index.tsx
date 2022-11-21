import { AiOutlineSearch } from "react-icons/ai";
import { Header } from "../../../components/Header";
import { BusinessHeader } from "../components/BusinessHeader";
import { Card } from "../components/Card";

import Coffee1 from "../../../assets/coffee-img1.jpg";
import { Search } from "../../../components/Search";

export const Service: React.FC = () => {
  

  return (
    <div className="flex flex-col">
      <Header />
      <BusinessHeader />
      <div className="px-[6.25rem] py-[2.625rem] mobile:px-[1.125rem] mobile:py-[1.75rem]">
        <h1 className="font-montserrat font-medium text-2xl">Serviços oferecidos</h1>
        <div className="mt-[2rem] mobile:mt-[1rem]">
          <Search />
        </div>
        <div className="mt-[3.65rem] flex flex-col font-montserrat font-semibold text-xl">
          <span>Em destaque</span>
          <div className="mt-3 grid grid-cols-3 gap-4 mobile:grid-cols-1">
            <Card image={Coffee1} product="Café simples" stars={5} price="R$ 2,00" />
            <Card image={Coffee1} product="Café simples" stars={3} price="R$ 2,00" />
            <Card image={Coffee1} product="Café simples" stars={2} price="R$ 2,00" />
          </div>
        </div>

        <div className="mt-[3.65rem] flex flex-col font-montserrat font-semibold text-xl">
          <span>Bebidas quentes</span>
          <div className="mt-3 grid grid-cols-3 gap-4 mobile:grid-cols-1">
            <Card image={Coffee1} product="Café simples" stars={5} price="R$ 2,00" />
            <Card image={Coffee1} product="Café simples" stars={5} price="R$ 2,00" />
            <Card image={Coffee1} product="Café simples" stars={4} price="R$ 2,00" />
          </div>
        </div>

        <div className="mt-[3.65rem] flex flex-col font-montserrat font-semibold text-xl">
          <span>Bebidas geladas</span>
          <div className="mt-3 grid grid-cols-3 gap-4 mobile:grid-cols-1">
            <Card image={Coffee1} product="Café simples" stars={1} price="R$ 2,00" />
            <Card image={Coffee1} product="Café simples" stars={5} price="R$ 2,00" />
            <Card image={Coffee1} product="Café simples" stars={5} price="R$ 2,00" />
          </div>
        </div>

        <div className="mt-[3.65rem] flex flex-col font-montserrat font-semibold text-xl">
          <span>Chás</span>
          <div className="mt-3 grid grid-cols-3 gap-4 mobile:grid-cols-1">
            <Card image={Coffee1} product="Café simples" stars={5} price="R$ 2,00" />
            <Card image={Coffee1} product="Café simples" stars={2} price="R$ 2,00" />
            <Card image={Coffee1} product="Café simples" stars={5} price="R$ 2,00" />
          </div>
        </div>

        <div className="mt-[3.65rem] flex flex-col font-montserrat font-semibold text-xl">
          <span>Doces</span>
          <div className="mt-3 grid grid-cols-3 gap-4 mobile:grid-cols-1">
            <Card image={Coffee1} product="Café simples" stars={4} price="R$ 2,00" />
            <Card image={Coffee1} product="Café simples" stars={4} price="R$ 2,00" />
            <Card image={Coffee1} product="Café simples" stars={2} price="R$ 2,00" />
          </div>
        </div>
      </div>
    </div>
  );
}