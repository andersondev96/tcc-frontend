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
        <div className="flex flex-row items-center gap-2 sm:gap-4 mt-4">
            <div>
                <img
                    className="h-4 w-4 sm:h-8 sm:w-8 rounded-full"
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
                <div className="flex flex-row items-center gap-1">
                    <AssessmentsStars stars={data.stars} />
                </div>

            </div>
        </div>
    );
}