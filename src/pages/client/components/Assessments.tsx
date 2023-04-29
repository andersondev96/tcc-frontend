import { format } from "date-fns";
import AvatarImg from "../../../assets/user.png";
import { AssessmentsStars } from "./AssessmentsStars";

interface Assessment {
    id: string;
    user_id: string;
    comment: string;
    stars: number;
    createdAt: Date;
    user: {
        name: string;
        avatar: string;
    }
}

interface AssessmentsProps {
    data: Assessment;
}

export const Assessments: React.FC<AssessmentsProps> = ({ data }) => {

    return (
        <div className="flex flex-row items-center gap-[1.125rem] mt-[1.625rem]">
            <div>
                <img
                    className="h-[2.625rem] w-[2.625rem] mobile:h-[1.75rem] mobile:w-[1.75rem] rounded-full"
                    src={data.user && data.user.avatar && data.user.avatar || AvatarImg}
                    alt="avatar"
                    title={data.user && data.user.name}
                />
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-4 items-center ">
                    <span className="font-bold text-sm text-blue-800">{data.user && data.user.name}</span>
                    <p className="font-light text-xs">{format(new Date(data.createdAt), "dd/MM/yyyy")}</p>
                </div>
                <span className="font-inter text-sm mobile:text-xs">{data.comment}</span>
                <div className="flex flex-row items-center gap-[0.25rem]">
                    <AssessmentsStars stars={data.stars} />
                </div>

            </div>
        </div>
    );
}