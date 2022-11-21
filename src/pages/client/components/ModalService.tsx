import { useState } from "react";
import { Assessments } from "./Assessments";
import { AssessmentsForm } from "./AssessmentsForm";
import { AssessmentsStars } from "./AssessmentsStars";
import { ButtonAction } from "./ButtonAction";

import { ModalContainer } from "../../../components/ModalContainer";
import { ModalCalculate } from './ModalCalculate';

interface ModalServiceProps {
  service: string;
  description: string;
  stars: number;
  image: string;
  price: string;
}

export const ModalService: React.FC<ModalServiceProps> = ({ service, description, stars, image, price }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }  

  return (
    <div>
      <div className="flex flex-row items-center gap-[6.25rem] px-[3.125rem] py-[7.75rem] h-[8.875rem] bg-gray-200 border-b-2 border-gray-500">
        <img src={image} alt={service} className="w-[6.25rem] h-[6.25rem] object-fill rounded-full" />
        <div className="flex flex-col gap-[0.25rem]">
          <span className="font-inter font-medium text-[1.75rem]">{service}</span>
          <AssessmentsStars stars={stars} />
          <span className="font-inter font-semibold text-amber-900 text-2xl">{price}</span>
        </div>
      </div>
      <div className="px-12 py-12 flex flex-col">
        <div className="flex flex-col gap-2">
          <span className="font-inter font-semibold text-lg">Descrição</span>
          <p className="font-inter font-light text-lg">
            {description}
          </p>
          <div className="mt-6 flex flex-row gap-[2.75rem]">
            <ButtonAction type="favorite" />
            <ButtonAction type="calculate" onClick={openModal} />
          </div>
        </div>
        <div className="mt-[2.25rem] flex flex-col">
          <div className="flex flex-col gap-[0.375rem]">
            <span className="font-inter font-semibold">Avaliações</span>
            <p className="font-inter font-light text-xs">4 comentários</p>
          </div>
          <Assessments text="Ótimo café" stars={3} />
          <Assessments text="Muito bom este café" stars={4} />
          <Assessments text="Café saboroso" stars={5} />
        </div>

        <div className="mt-8">
          <AssessmentsForm />
        </div>
      </div>

      <ModalContainer
        title="Solicitar orçamento"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <ModalCalculate />
      </ModalContainer>

    </div>
  );
}