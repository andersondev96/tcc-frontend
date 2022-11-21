import { AiOutlineArrowLeft } from "react-icons/ai";
import { Header } from "../../../components/Header";
import { CardFavorites } from "../components/CardFavorites";
import Reading from "../../../assets/reading.jpg";
import BarberShop from "../../../assets/barber-shop.jpg";
import Mechanic from "../../../assets/mechanic.jpg";
import Interface from "../../../assets/interface.jpg";
import Painting from "../../../assets/painting.jpg";
import Candy from "../../../assets/candy.jpg";
import { PreviousPageButton } from "../components/PreviousPageButton";

export const Favorites: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-col p-12">
        <PreviousPageButton />
        
        <div className="flex flex-col items-center py-[3.375rem] mobile:py-[1.75rem] mobile:items-start">
          <h1 className="font-montserrat font-medium text-2xl">Favoritos</h1>
        </div>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-9 ">
            <div className="flex flex-col py-2 w-[31.25rem] border-b border-gray-300 ">
              <span className="font-montserrat font-semibold text-2xl">Negócios</span>
            </div>
            <div className="flex flex-row gap-[1.625rem] mobile:flex-col">
              <CardFavorites image={Reading} description="Clube dos livros" />
              <CardFavorites image={BarberShop} description="Barbearia Azevedo" />
              <CardFavorites image={Mechanic} description="Oswaldo Mecânica" />
            </div>
          </div>

          <div className="flex flex-col gap-9 ">
            <div className="flex flex-col py-2 w-[31.25rem] border-b border-gray-300 ">
              <span className="font-montserrat font-semibold text-2xl">Serviços</span>
            </div>
            <div className="flex flex-row gap-[1.625rem] mobile:flex-col">
              <CardFavorites image={Interface} description="Design de telas" businessName="Pablo Design" />
              <CardFavorites image={Painting} description="Pintura externa de casas" businessName="Art Design Pinturas" />
              <CardFavorites image={Candy} description="Doces para festas" businessName="Snacks & Cands Buffet" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}