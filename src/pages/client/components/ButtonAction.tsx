import { AiFillHeart, AiOutlineCalculator } from "react-icons/ai";

interface ButtonActionProps {
    type: 'favorite' | 'calculate';
    onClick?: () => void;
    active?: boolean;
}

export const ButtonAction: React.FC<ButtonActionProps> = ({ type, onClick, active = false }) => {

    return (
        <div className="flex items-center mobile:justify-center mobile:mt-4" onClick={onClick}>
            <button
                className={`flex flex-row items-center justify-center gap-4 ${type === 'favorite' ? 'w-36' : 'w-52'} h-10 rounded hover:opacity-80 transition-opacity
              ${active ? 'bg-red-500 border-none' : 'bg-gray-300 border'}`}
            >
                {type === 'favorite' ? (
                    <AiFillHeart size={24} color={`${active ? '#FFFFFF' : '#EB1B2E'}`} />
                ) : (<AiOutlineCalculator size={24} color="#28267C" />)}

                <span className={`font-inter text-sm font-semibold ${active ? 'text-white' : 'text-gray-800'}`}>
                    {type === 'favorite' ? (
                        active ? 'Desfavoritar' : 'Favoritar'
                    ) : 'Fazer orçamento'}
                </span>
            </button>
        </div>
    )
}