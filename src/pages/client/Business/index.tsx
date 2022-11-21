import { Header } from "../../../components/Header";
import { BusinessHeader } from '../components/BusinessHeader';
import { Paragraph } from "../components/Paragraph";

import Coffee1 from '../../../assets/coffee-img1.jpg';
import Coffee2 from '../../../assets/coffee-img2.jpg';
import Coffee3 from '../../../assets/coffee-img3.jpg';
import Coffee4 from '../../../assets/coffee-img4.jpg';
import { Pictures } from "../components/Pictures";
import { Assessments } from "../components/Assessments";
import { AssessmentsForm } from "../components/AssessmentsForm";
import { ButtonAction } from "../components/ButtonAction";

export const Business: React.FC = () => {

  const images = [
    { id: 1, image: Coffee1, description: "Image1" },
    { id: 2, image: Coffee2, description: "Image2" },
    { id: 3, image: Coffee3, description: "Image3" },
    { id: 4, image: Coffee4, description: "Image4" },
  ]

  return (
    <div className="flex flex-col">
      <Header />
      <BusinessHeader />
      <div className="px-[6.25rem] py-[2.625rem] mobile:px-[1.125rem] mobile:py-[1.75rem]">
        <div className="flex flex-col gap-8 mobile:gap-4">
          <Paragraph
            title="Sobre o negócio"
            text="Estamos a começar a temporada com a nossa mistura de Solstício de Verão. Uma celebração de longos dias, tempo quente e um pouco de R&amp;R extra. É suculento, doce e delicioso quente ou gelado.
            Obtemos e assados este blend para produzir um espectro de sabores que entrega uma experiência animada e refinada no copo."
          />

          <Paragraph
            title="Serviços oferecidos"
            text="Café"
          />

          <Paragraph
            title="Endereço"
            text="Mission District 3014 20th Street, SF, CA, 94110"
          />

          <div className="flex flex-col gap-2">
            <span className="font-inter font-semibold text-gray-700">
              Horários de funcionamento
            </span>
            <div>
              <div className="flex flex-row gap-[0.313rem]">
                <span className="font-inter uppercase">Seg à Sex:</span>
                <p className="font-inter font-medium text-blue-200">07:00 - 17:00</p>
              </div>
              <div className="flex flex-row gap-[0.313rem]">
                <span className="font-inter uppercase">Sáb:</span>
                <p className="font-inter font-medium text-blue-200">07:00 - 19:00</p>
              </div>
              <div className="flex flex-row gap-[0.313rem]">
                <span className="font-inter uppercase">Dom:</span>
                <p className="font-inter font-medium text-blue-200">07:00 - 21:00</p>
              </div>
            </div>
          </div>

          <Paragraph
            title="Telefone"
            text="+1 415-861-1313"
          />

          <div className="flex flex-col gap-2">
            <span className="font-inter font-semibold text-gray-700">Fotos</span>
            <div className="flex flex-row mobile:grid mobile:grid-cols-2 gap-[1.25rem]">
              {images.map(img => (
                <Pictures key={img.id} image={img.image} description={img.description} />
              ))}
            </div>
          </div>
          <ButtonAction type="favorite" />

          <div className="flex flex-col mt-[2.25rem]">
            <div className="flex flex-col gap-[0.375rem]">
              <span className="font-inter font-semibold">Avaliações</span>
              <p className="font-inter font-light text-xs">4 comentários</p>
            </div>
            <Assessments text="O melhor café da cidade" stars={3} />
            <Assessments text="Atendimento de qualidade, estão de parabéns" stars={4} />
            <Assessments text="Gostei muito do atendimento" stars={5} />
          </div>

          <div className="flex flex-row mt-8">
            <AssessmentsForm />
          </div>

        </div>
      </div>
    </div>
  )
}