import { FiAlertCircle } from "react-icons/fi";
interface DeleteProductModalProps {
    name: string;
    removeProduct: () => void;
    onCancel: () => void;
}

export const DeleteModal: React.FC<DeleteProductModalProps> = ({ name, removeProduct, onCancel }) => {

    return (
        <div className="flex flex-col items-center justify-center my-8">
            <FiAlertCircle size={48} color="#FF9900" />
            <span className="w-64 mt-8 font-montserrat font-medium text-center text-lg">
                Tem certeza que deseja excluir o produto {name} ?
            </span>
            <div className="flex flex-row gap-9 items-center mt-8">
                <button
                    onClick={removeProduct}
                    className="w-24 h-10 bg-gray-800 rounded font-montserrat font-medium text-lg text-white hover:brightness-90 transition-opacity duration-300">
                    Sim
                </button>

                <button
                    onClick={onCancel}
                    className="w-24 h-10 bg-gray-500 rounded font-montserrat font-medium text-lg text-white hover:brightness-90 transition-opacity duration-300">
                    Não
                </button>
            </div>
        </div>
    );
};
