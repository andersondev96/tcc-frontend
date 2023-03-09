import { AiOutlineArrowLeft } from "react-icons/ai";

export const PreviousPageButton: React.FC = () => {

  return (
    <button
      onClick={() => window.history.back()} 
      className="pb-0 flex flex-row items-center gap-2 font-montserrat font-semibold text-sm text-indigo-400"
    >
      <AiOutlineArrowLeft />
      <span>Voltar</span>
    </button>
  );
}