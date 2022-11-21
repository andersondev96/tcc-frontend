import { SideBar } from "../../../components/Sidebar";
import Coffee from "../../../assets/coffee-img1.jpg";

import { GoLinkExternal } from "react-icons/go";
import { FiEdit, FiEdit2 } from "react-icons/fi";

import Coffee1 from "../../../assets/coffee-img1.jpg";
import Coffee2 from "../../../assets/coffee-img2.jpg";
import Coffee3 from "../../../assets/coffee-img3.jpg";
import Coffee4 from "../../../assets/coffee-img4.jpg";
import { Pictures } from "../../client/components/Pictures";
import { AssessmentsStars } from "../../client/components/AssessmentsStars";
import { Assessments } from "../../client/components/Assessments";
import { Link } from "react-router-dom";

export const BusinessEntrepreneur: React.FC = () => {
  const images = [
    { id: 1, image: Coffee1, description: "Image1" },
    { id: 2, image: Coffee2, description: "Image2" },
    { id: 3, image: Coffee3, description: "Image3" },
    { id: 4, image: Coffee4, description: "Image4" },
  ];

  return (
    <div className="flex flex-row">
      <SideBar />
      <div className="flex flex-col w-full sm:ml-64">
        <div className="flex flex-row items-center gap-12 mobile:gap-6 px-[6.25rem] py-12 bg-gray-200 border-b-2 border-gray-500 mobile:py-6">
          <img
            src={Coffee}
            alt=""
            className="h-16 w-16 mobile:w-12 mobile:min-h-12 object-fill rounded-full"
          />
          <span className="font-inter font-bold text-2xl text-gray-800 mobile:text-lg">
            Singhtglass Coffee
          </span>
        </div>
        <div className="flex flex-col gap-6 mobile:gap-4 py-16 mobile:py-8 px-[6.25rem]">
          <div className="flex flex-col gap-1">
            <span className="font-inter font-medium text-base mobile:text-sm">
              Sobre o negócio
            </span>
            <p className="font-inter text-sm text-justify">
              Estamos a começar a temporada com a nossa mistura de Solstício de
              Verão. Uma celebração de longos dias, tempo quente e um pouco de
              R&R extra. É suculento, doce e delicioso quente ou gelado. Obtemos
              e assados este blend para produzir um espectro de sabores que
              entrega uma experiência animada e refinada no copo.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-inter font-medium text-base mobile:text-sm">
              CNPJ
            </span>
            <p className="font-inter text-sm text-justify">0000-0000-0000/00</p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-inter font-medium text-base mobile:text-sm">
              Categoria
            </span>
            <p className="font-inter text-sm text-justify">Cafeteria</p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-inter font-medium text-base mobile:text-sm">
              Serviços
            </span>
            <p className="font-inter text-sm text-justify">
              Cafés, bebidas quentes e geladas
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-inter font-medium text-base mobile:text-sm">
              Telefone
            </span>
            <p className="font-inter text-sm text-justify">(00) 00000-0000</p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-inter font-medium text-base">Whatsapp</span>
            <p className="font-inter text-sm text-justify">(00) 00000-0000</p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-inter font-medium text-base mobile:text-sm">
              E-mail
            </span>
            <p className="font-inter text-sm text-justify">mail@example.com</p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-inter font-medium text-base mobile:text-sm">
              Website
            </span>
            <p className="flex flex-row items-center gap-1 font-inter text-sm text-justify">
              https://www.cafeteria.com.br
              <GoLinkExternal />
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-inter font-medium text-base mobile:text-sm">
              Horários de funcionamento
            </span>
            <p className="font-inter text-sm text-justify">
              Segunda à Sexta: 07:00 - 17:00
            </p>
            <p className="font-inter text-sm text-justify">
              Sábado: 07:00 - 19:00
            </p>
            <p className="font-inter text-sm text-justify">
              Domingo: 07:00 - 21:00
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-inter font-medium text-base mobile:text-sm">
              Endereço
            </span>
            <p className="font-inter text-sm text-justify">
              Av. dos Estudantes, 107 - Paraíso, Ibiporã - PR, 86200-000
            </p>
          </div>

          <span className="py-3 border-b border-black font-inter font-medium text-base mobile:text-sm">
            Imagens
          </span>
          <div className="flex flex-row mobile:grid mobile:grid-cols-2 gap-[1.25rem]">
            {images.map((img) => (
              <Pictures
                key={img.id}
                image={img.image}
                description={img.description}
              />
            ))}
          </div>

          <div className="flex flex-col mt-14 mobile:mt-8 gap-1">
            <span className="font-inter font-medium text-xl mobile:text-sm">
              Avaliações
            </span>
            <p className="font-inter font-light text-base">
              16 avaliações recebidas
            </p>
            <div className="flex flex-row items-center gap-3">
              <AssessmentsStars stars={5} mode="view" />
              <span className="font-inter font-semibold text-xs text-gray-700">
                3.0
              </span>
            </div>
            <Assessments text="O melhor café da cidade" stars={3} />
            <Assessments
              text="Atendimento de qualidade, estão de parabéns"
              stars={4}
            />
            <Assessments text="Gostei muito do atendimento" stars={5} />
          </div>

          <span className="mt-4 font-inter font-light text-xs text-blue-400">
            Veja todos os comentários
          </span>

          <Link to="/dashboard/business/create">
            <button className="mt-12 mobile:mt-4 flex flex-row items-center justify-center gap-4 w-40 mobile:w-28 h-12 mobile:h-10 rounded bg-green-500 font-montserrat font-medium mobile:text-sm text-white cursor-pointer hover:brightness-90 duration-300">
              <FiEdit2 />
              <span>Editar</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
