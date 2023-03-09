import { useState } from "react";

export const Range: React.FC = () => {

  const [price, setPrice] = useState(0);

  return (
    <div>
      <label
        htmlFor="price"
        className="font-montserrat font-medium text-lg text-white"
      >
        Preço máximo
      </label>

      <input
        id="default-range"
        type="range"
        max="1000"
        step="10"
        className="estilo w-full h-2 bg-white rounded-lg appearance-none inline-block outline-none cursor-pointer dark:bg-gray-700 "
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <span className="flex flex-row items-end justify-end font-montserrat font-semibold text-white">{price}</span>
    </div>
  )
}