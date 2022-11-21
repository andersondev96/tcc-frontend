import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

interface CardFavoritesProps {
  image: string;
  description: string;
  businessName?: string;
}

export const CardFavorites: React.FC<CardFavoritesProps> = (
  {
    image,
    description,
    businessName }
) => {
  const [favorite, setFavorite] = useState(true);

  return (
    <>
      {favorite ? (
        <div className="h-[12.25rem] w-[12.25rem] border-2 border-gray-500 rounded">
          <img src={image} alt="" className=" absolute h-[12rem] w-[12rem] object-cover" />
          <div className={`flex flex-col justify-center p-2 absolute w-[12rem] ${businessName ? 'h-[3.25rem] mt-[8.75rem]' : 'h-[1.5rem] mt-[10.469rem]'} bg-gray-300 bg-opacity-60`}>
            <div className="flex flex-row items-center justify-between">
              <span className="font-montserrat font-medium text-sm leading-3">{description}</span>
              <AiFillHeart
                size={16}
                className="text-red-200 cursor-pointer hover:opacity-60 transition-opacity duration-300"
                onClick={() => setFavorite(false)}
              />
            </div>
            {businessName ? (
              <Link to="/business">
                <span className="font-montserrat font-semibold text-blue-600 text-[0.625rem]">
                  {businessName}
                </span>
              </Link>
            ) : ('')}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}