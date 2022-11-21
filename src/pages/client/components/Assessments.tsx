import AvatarImg from "../../../assets/avatar.jpg";
import { AssessmentsStars } from "./AssessmentsStars";

interface AssessmentsProps {
  text: string;
  stars: number;
}

export const Assessments: React.FC<AssessmentsProps> = ({ text, stars = 5}) => {
  
  return (
    <div className="flex flex-row items-center gap-[1.125rem] mt-[1.625rem]">
      <div>
        <img 
          className="h-[2.625rem] w-[2.625rem] mobile:h-[1.75rem] mobile:w-[1.75rem] rounded-full"
          src={AvatarImg} 
          alt="avatar" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-[0.25rem]">
            <AssessmentsStars stars={stars} />
        </div>
        <span className="font-inter font-medium text-sm mobile:text-xs">{text}</span>
      </div>
    </div>
  );
}