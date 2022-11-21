import { AssessmentsStars } from "./AssessmentsStars";
import AvatarImg from "../../../assets/avatar.jpg";

export const AssessmentsForm: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 mobile:gap-4">
      <div className="flex flex-row items-center gap-[1.563rem]">
        <img 
          src={AvatarImg} 
          alt="avatar" 
          className="h-[3.25rem] w-[3.25rem] mobile:h-[2.25rem] mobile:w-[2.25rem] rounded-full"
        />
        <textarea 
          name="assessment" 
          placeholder="Escreva aqui o seu comentário"
          className="w-[36rem] h-[8.125rem] mobile:w-[18rem] resize-none rounded border-2 border-gray-100 outline-0 focus:border-indigo-600 font-inter font-medium text-sm text-gray-700" />
      </div>
      <div className="px-[5rem] mobile:px-[3.813rem] flex flex-col gap-2">
        <span className="font-inter font-semibold text-sm text-gray-700">Classificação</span>
        <AssessmentsStars mode="edit"  />
      </div>
      <button className="ml-[5rem] mobile:ml-[3.813rem] w-32 mobile:w-24 h-[3.125rem] mobile:h-[2.75rem] bg-indigo-600 rounded text-white font-inter font-medium text-lg hover:brightness-90 transition-opacity">Enviar</button>
    </div>

  )
}