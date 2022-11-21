import { FiSend } from "react-icons/fi";
import Coffee1 from '../../../assets/coffee-img1.jpg';
import UserAvatar from '../../../assets/avatar.jpg';
import { Message } from "./Message";

export const ModalChat: React.FC = () => {
  return (
    <div className="flex flex-col h-full justify-between px-[3.125rem] py-[4rem]">
      <div className="flex flex-col gap-[2.25rem] mt-5 p-[1.875rem] w-[48.75rem] h-[24.625rem] border border-gray-400 rounded overflow-auto">

        <Message
          send="business"
          userAvatar={Coffee1}
          message="Olá, em que posso ajudar?"
        />

        <Message
          send="client"
          userAvatar={UserAvatar}
          message="Gostaria de saber informações de um certo serviço que vocês oferecem para os clientes."
        />

        <Message
          send="business"
          userAvatar={Coffee1}
          message="Entendi, você já conhece os nossos serviços?"
        />

        <Message
          send="client"
          userAvatar={UserAvatar}
          message="Conheço sim"
        />

      </div>

      <div className="flex flex-row items-center justify-between">
        <textarea
          className="w-[48.75rem] pr-14 rounded resize-none bg-gray-300 border-none font-montserrat text-sm"
          placeholder="Digite a sua mensagem aqui"
        />
        <button className="flex absolute ml-[45.75rem]">
          <FiSend size={32} color="#08A358" className="" />
        </button>
      </div>
    </div>
  );
}