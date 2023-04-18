import { FiAlertCircle } from "react-icons/fi";
interface DeleteProductModalProps {
    removeAccount: () => void;
    onCancel: () => void;
}

export const DeleteAccountModal: React.FC<DeleteProductModalProps> = ({ removeAccount, onCancel }) => {

    return (
        <div className="flex flex-col items-center justify-center my-8">
            <FiAlertCircle size={48} color="#FF9900" />
            <h1 className="font-medium mt-2 text-lg">Excluir conta</h1>
            <span className="w-full px-8 mt-2 text-center">
                Ao confirmar a exclusão de sua conta, sua empresa será removida, incluindo todos os
                serviços cadastrados, clientes, orçamentos e todos os dados vinculados. Lembramos que
                essa ação é irreversível. Confirma a exclusão?
            </span>
            <div className="flex flex-row gap-9 items-center mt-8">
                <button
                    onClick={removeAccount}
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
