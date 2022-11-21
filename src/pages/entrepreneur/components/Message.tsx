import React from "react";
import { useNavigate } from "react-router-dom";

interface MessageProps {
  img: string;
  name: string;
  last_message: string;
  dateTime_of_last_message: string;
  cont_messages_not_read: number;
  isActive?: boolean;
}

export const Message: React.FC<MessageProps> = ({
  img,
  name,
  last_message,
  dateTime_of_last_message,
  cont_messages_not_read,
  isActive = true,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-row justify-between p-4 w-[58.313rem] h-[5.625rem] mobile:w-[18.25rem]  border-2 rounded ${
        isActive
          ? "border-indigo-300  hover:bg-gray-100 hover:bg-opacity-5 cursor-pointer"
          : "border-gray-500 cursor-not-allowed"
      }`}
      onClick={() => (isActive ? navigate("/dashboard/chat/message") : "")}
    >
      <div className="flex flex-row items-center gap-16 mobile:gap-8">
        <img
          src={img}
          alt={img}
          className={`w-14 h-14 mobile:w-12 mobile:h-9 rounded-full object-fill ${
            !isActive ? "grayscale" : ""
          }`}
        />

        <div className="flex flex-col">
          <span
            className={`font-montserrat font-semibold text-base mobile:text-sm ${
              isActive ? " text-indigo-400" : "text-gray-400"
            }`}
          >
            {name}
          </span>
          <p
            className={`font-montserrat font-light text-sm mobile:text-[0.625rem] mobile:leading-4 ${
              !isActive ? "text-gray-400" : ""
            }`}
          >
            {last_message}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 mobile:items-center">
        <p
          className={`font-montserrat text-xs mobile:text-[0.5rem] mobile:leading-3 mobile:text-center ${
            !isActive ? "text-gray-400" : ""
          }`}
        >
          {dateTime_of_last_message}
        </p>
        {isActive && (
          <span className="bg-blue-800 w-6 h-6 mobile:w-4 mobile:h-4 font-montserrat font-semibold text-white text-center rounded-full mobile:text-xs">
            {cont_messages_not_read}
          </span>
        )}
      </div>
    </div>
  );
};
