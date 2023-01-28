import { Card } from "../components/Card";
import { Search } from "../../../components/Search";
import { NavBar } from "../../../components/NavBar/NavBar";

import Coffee1 from "../../../assets/coffee-img1.jpg";

export const Service: React.FC = () => {

    return (
        <div className="flex flex-col">
            <NavBar pageCurrent="servicos" />
            <div className="px-4 py-7 sm:px-24 sm:py-10">
                <h1 className="font-montserrat font-medium text-2xl">Serviços oferecidos</h1>
                <div className="mt-8 sm:mt-8">
                    <Search />
                </div>
                <div className="mt-11 flex flex-col font-montserrat font-semibold text-xl">
                    <span>Em destaque</span>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Card image={Coffee1} product="Café simples" stars={5} price="R$ 2,00" />
                        <Card image={Coffee1} product="Café simples" stars={3} price="R$ 2,00" />
                        <Card image={Coffee1} product="Café simples" stars={2} price="R$ 2,00" />
                    </div>
                </div>

                <div className="mt-8 flex flex-col font-montserrat font-semibold text-xl">
                    <span>Bebidas quentes</span>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Card image={Coffee1} product="Café simples" stars={5} price="R$ 2,00" />
                        <Card image={Coffee1} product="Café simples" stars={5} price="R$ 2,00" />
                        <Card image={Coffee1} product="Café simples" stars={4} price="R$ 2,00" />
                    </div>
                </div>

                <div className="mt-8 flex flex-col font-montserrat font-semibold text-xl">
                    <span>Bebidas geladas</span>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Card image={Coffee1} product="Café simples" stars={1} price="R$ 2,00" />
                        <Card image={Coffee1} product="Café simples" stars={5} price="R$ 2,00" />
                        <Card image={Coffee1} product="Café simples" stars={5} price="R$ 2,00" />
                    </div>
                </div>

                <div className="mt-8 flex flex-col font-montserrat font-semibold text-xl">
                    <span>Chás</span>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Card image={Coffee1} product="Café simples" stars={5} price="R$ 2,00" />
                        <Card image={Coffee1} product="Café simples" stars={2} price="R$ 2,00" />
                        <Card image={Coffee1} product="Café simples" stars={5} price="R$ 2,00" />
                    </div>
                </div>

                <div className="mt-8 flex flex-col font-montserrat font-semibold text-xl">
                    <span>Doces</span>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Card image={Coffee1} product="Café simples" stars={4} price="R$ 2,00" />
                        <Card image={Coffee1} product="Café simples" stars={4} price="R$ 2,00" />
                        <Card image={Coffee1} product="Café simples" stars={2} price="R$ 2,00" />
                    </div>
                </div>
            </div>
        </div>
    );
}