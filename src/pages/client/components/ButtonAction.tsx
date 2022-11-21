import { useState } from "react";
import { AiFillHeart, AiOutlineCalculator } from "react-icons/ai";

interface ButtonActionProps {
  type: 'favorite' | 'calculate';
  onClick?: () => void;
}

export const ButtonAction: React.FC<ButtonActionProps> = ({ type, onClick }) => {
  const [like, setLike] = useState(false);

  return (
    <div className="flex items-center mobile:justify-center mobile:mt-4" onClick={onClick}>
      <button
        onClick={type === 'favorite' ? () => setLike(!like) : () => {}}
        className={`flex flex-row items-center justify-center gap-4 ${type === 'favorite' ? 'w-[9.375rem]' : 'w-[12.5rem]'} h-[2.5rem] rounded hover:opacity-80 transition-opacity
              ${like ? 'bg-red-200 border-none' : 'bg-transparent border  border-gray-900'}`}
      >
        { type === 'favorite' ? (
          <AiFillHeart size={24} color={`${like ? '#FFFFFF' : '#EB1B2E'}`} />
        ) : ( <AiOutlineCalculator size={24} color="#28267C" />)}
        
        <span className={`font-inter font-light ${like ? 'text-white' : ''}`}>
          { type === 'favorite' ? 'Favoritar' : 'Fazer orçamento'}
          </span>
      </button>
    </div>
  )
}