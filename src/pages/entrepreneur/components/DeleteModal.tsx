import { FiAlertCircle } from "react-icons/fi";

export const DeleteModal: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center my-24">
      <FiAlertCircle size={60} color="#FF9900" />
      <span className="w-64 mt-14 font-montserrat font-medium text-center text-xl">
        Tem certeza que deseja excluir este produto ?
      </span>
      <div className="flex flex-row gap-9 items-center mt-12">
        <button className="w-32 h-12 bg-gray-800 rounded font-montserrat font-medium text-lg text-white hover:brightness-90 transition-opacity duration-300">
          Sim
        </button>

        <button className="w-32 h-12 bg-gray-500 rounded font-montserrat font-medium text-lg text-white hover:brightness-90 transition-opacity duration-300">
          Não
        </button>
      </div>
    </div>
  );
};
