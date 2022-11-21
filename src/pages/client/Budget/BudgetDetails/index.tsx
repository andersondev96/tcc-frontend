import {
  AiOutlineArrowLeft,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlinePaperClip,
} from "react-icons/ai";
import { Header } from "../../../../components/Header";

import Coffee from "../../../../assets/coffee-img1.jpg";
import { PreviousPageButton } from "../../components/PreviousPageButton";

export const BudgetDetails: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-col p-12">
        <PreviousPageButton />
        <div className="flex flex-col items-center mobile:items-start">
          <div className="flex flex-col py-[3.375rem] mobile:py-[1.75rem] mobile:items-start">
            <h1 className="font-montserrat font-medium text-2xl">Orçamento</h1>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-row items-center gap-16 mobile:flex-col mobile:gap-2 mobile:items-start">
              <span className="font-montserrat font-semibold text-lg">
                Empresa
              </span>
              <p>Sightglass Coffee</p>
            </div>
            <div className="flex flex-col">
              <span className="font-montserrat font-semibold text-lg">
                Sobre a proposta
              </span>
              <div className="w-[33.125rem] overflow-x-auto relative shadow-md sm:rounded mt-4 mobile:w-60">
                <table className="w-full">
                  <thead className="font-montserrat font-semibold text-sm text-center bg-gray-300">
                    <tr>
                      <th className="py-2 px-6"></th>
                      <th className="py-2 px-6">Produto/Serviço</th>
                      <th className="py-2 px-6">Quantidade</th>
                    </tr>
                  </thead>
                  <tbody className="font-montserrat font-light text-sm text-center">
                    <tr>
                      <td className="py-2 px-6">
                        <img
                          src={Coffee}
                          alt=""
                          className="h-16 w-16 rounded mobile:h-8 mobile:w-8"
                        />
                      </td>
                      <td className="py-2 px-6">Cappuccino cremoso</td>
                      <td className="py-2 px-6">100</td>
                    </tr>

                    <tr className="font-montserrat font-light text-sm">
                      <td className="py-2 px-6">
                        <img
                          src={Coffee}
                          alt=""
                          className="h-16 w-16 rounded"
                        />
                      </td>
                      <td className="py-2 px-6">Cappuccino cremoso</td>
                      <td className="py-2 px-6">100</td>
                    </tr>

                    <tr className="font-montserrat font-light text-sm">
                      <td className="py-2 px-6">
                        <img
                          src={Coffee}
                          alt=""
                          className="h-16 w-16 rounded"
                        />
                      </td>
                      <td className="py-2 px-6">Cappuccino cremoso</td>
                      <td className="py-2 px-6">100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-[45.25rem] mobile:w-60">
              <span className="font-montserrat font-semibold text-lg">
                Descrição
              </span>
              <p className="font-montserrat font-light text-sm text-justify">
                Caro cliente, estamos dispostos a te atender, elaboramos esse
                documento com uma proposta detalhada, qualquer dúvida entre em
                contato pelo nosso chat ou redes sociais. Será um prazer
                trabalhar para você.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-montserrat font-semibold text-lg">
                Arquivos
              </span>
              <a
                href="#"
                className="flex flex-row gap-2 items-center text-indigo-400 text-sm hover:underline"
              >
                <AiOutlinePaperClip />
                <p>Proposta.pdf</p>
              </a>
            </div>
            <div className="flex flex-col gap-2 w-[45.25rem]">
              <span className="font-montserrat font-semibold text-lg">
                Data de entrega
              </span>
              <p className="font-montserrat font-light text-sm">11/04/2022</p>
            </div>
            <div className="flex flex-col gap-2 w-[45.25rem]">
              <span className="font-montserrat font-semibold text-lg">
                Valor
              </span>
              <p className="font-montserrat font-light text-sm">
                3x de R$ 44,90
              </p>
            </div>

            <div className="mt-2 flex flex-row gap-12 mobile:flex-col mobile:gap-2">
              <button className="flex flex-row items-center justify-center gap-5 w-[9.25rem] h-12 rounded bg-green-600 font-montserrat font-semibold text-white hover:brightness-90  transition-opacity duration-300">
                <AiOutlineCheck />
                <span>Aceitar</span>
              </button>

              <button className="flex flex-row items-center justify-center gap-5 w-[9.25rem] h-12 rounded bg-red-200 font-montserrat font-semibold text-white hover:brightness-90  transition-opacity duration-300">
                <AiOutlineClose />
                <span>Recusar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
