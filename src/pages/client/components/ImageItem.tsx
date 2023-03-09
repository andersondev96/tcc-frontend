import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Coffee1 from "../../../assets/coffee-img1.jpg"

export const ImageItem: React.FC = () => {
  const [itemSelected, setItemSelected] = useState(false);
  const [quantity, setQuantity] = useState(0);

  function handleClickItem() {
    if (!itemSelected) {
      setItemSelected(true);
      setQuantity(quantity+1);
    } else {
      setItemSelected(false);
      setQuantity(0);
    }
  }
  

  return (
    <div className="flex flex-row items-end">
      <img
        src={Coffee1}
        alt="Coffee1"
        className={`w-16 h-16 object-fill rounded border-4 cursor-pointer ${itemSelected ? 'border-blue-400' : 'border-transparent'}`}
        onClick={handleClickItem}
      />
      {itemSelected ? (
        <div 
          className="absolute flex flex-col items-center justify-between p-1 h-6 w-6 bg-indigo-200 rounded-full ml-12 mb-1"
          onClick={() => setQuantity(quantity + 1)}
        >
          <span className="font-inter font-medium text-xs text-white cursor-pointer">{quantity}</span>
        </div>
      ) : ''}
    </div>
  );
}