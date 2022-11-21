import { ImageItem } from "./ImageItem"

export const ModalCalculate: React.FC = () => {

  return (
    <div className="flex flex-col px-[3.125rem] py-[4rem]">
      <span className="font-inter font-semibold text-[1.375rem]">Escolha um ou mais serviços e produtos</span>
      <div className="grid grid-cols-10 gap-4 mt-8 h-[12.5rem] p-4 border border-gray-300 rounded overflow-auto">
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
      </div>
      <div className="flex flex-col mt-8">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-[0.125rem]">
            <label htmlFor="objective" className="font-montserrat font-semibold text-sm text-indigo-600 outline-0 focus:border-indigo-600">
              Objetivo do serviço
            </label>
            <input type="text" className="w-[21.875rem] h-[2.5rem] bg-gray-300 rounded border-none font-light text-sm" />
          </div>

          <div className="flex flex-col gap-[0.125rem]">
            <label htmlFor="objective" className="font-montserrat font-semibold text-sm text-indigo-600 outline-0 focus:border-indigo-600">
              Prazo esperado
            </label>
            <select name="deadline"
              className="w-[21.875rem] h-[2.5rem] bg-gray-300 rounded border-none font-montserrat font-light text-sm"
            >
              <option value="">Selecione uma opção</option>
              <option value="">5 a 15 dias</option>
              <option value="">15 a 30 dias</option>
              <option value="">30 a 90 dias</option>
              <option value="">Mais de 90 dias</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col mt-4 gap-[0.125rem]">
          <label htmlFor="objective" className="font-montserrat font-semibold text-sm text-indigo-600 outline-0 focus:border-indigo-600">
            Observações
          </label>
          <textarea
            name="observations"
            className="h-[7.188rem] bg-gray-300 rounded border-none outline-0 resize-none font-montserrat font-light text-sm" />
        </div>

      </div>
        <button 
          className="mt-[2.75rem] w-[9.813rem] h-[2.5rem] bg-blue-200 rounded font-montserrat font-medium  text-white text-sm hover:brightness-90"
        >
          Enviar solicitação
        </button>
    </div>
  )
}