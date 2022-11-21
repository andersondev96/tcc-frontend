import { AiOutlineArrowLeft, AiOutlineCamera } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import { Header } from "../../../components/Header"
import { PreviousPageButton } from "../components/PreviousPageButton";

export const EditProfile: React.FC = () => {
  return (
    <div>
      <Header />

      <div className="flex flex-col p-12">
        <PreviousPageButton />

        <div className="flex flex-col items-center py-[3.375rem] mobile:py-[1.75rem]">
          <h1 className="font-montserrat font-medium text-2xl">Editar perfil</h1>

          <div className="flex flex-col items-center mt-16 mobile:mt-12">
            <div>
              <label
                htmlFor="dropzone-file"
                className="flex flex-col justify-center items-center w-64 h-64 bg-green-300 rounded-full border-2 mobile:w-36 mobile:h-36 border-green-400 cursor-pointer hover:bg-green-400 transition-colors duration-300">
                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                  <AiOutlineCamera size={48} color="#08A358" />
                </div>
                <input id="dropzone-file" type="file" className="hidden" accept="image/*" />
              </label>
            </div>

            <div className="mt-16 flex flex-col w-72 gap-4 mobile:mt-12 mobile:w-48">
              <div className="flex flex-col gap-1 ">
                <label htmlFor="">Nome</label>
                <input
                  type="text"
                  placeholder="John Silva"
                  className="border rounded bg-gray-200 font-montserrat font-light text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="">E-mail</label>
                <input
                  type="text"
                  placeholder="john@example.com"
                  className="border rounded bg-gray-200 font-montserrat font-light text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="">Telefone</label>
                <input
                  type="text"
                  placeholder="(31) 99999-99999"
                  className="border rounded bg-gray-200 font-montserrat font-light text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="">CPF</label>
                <input
                  type="text"
                  placeholder="999.999.999-99"
                  className="border rounded bg-gray-200 font-montserrat font-light text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="">Senha atual</label>
                <input
                  type="text"
                  className="border rounded bg-gray-200 font-montserrat font-light text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="">Nova senha</label>
                <input
                  type="text"
                  className="border rounded bg-gray-200 font-montserrat font-light text-sm"
                />
              </div>

              <div className="mt-4 flex flex-row items-center justify-center">
                <button
                  className="w-[10rem] h-[3.125rem] flex flex-row items-center gap-2 justify-center rounded bg-indigo-400 font-inter text-2xl text-white uppercase hover:brightness-90 transition-colors"
                >
                  <FiSave />
                  Salvar
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}