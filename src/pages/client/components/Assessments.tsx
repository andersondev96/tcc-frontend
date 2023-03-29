import AvatarImg from "../../../assets/user.png";
import { AssessmentsStars } from "./AssessmentsStars";

interface Assessment {
    id: string;
    user_id: string;
    comment: string;
    stars: number;
    user: {
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
                    src={AvatarImg || data.user && data.user.avatar && data.user.avatar}
                    alt="avatar" />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-[0.25rem]">
                    <AssessmentsStars stars={data.stars} />
                </div>
                <span className="font-inter font-medium text-sm mobile:text-xs">{data.comment}</span>
            </div>
        </div>
    );
}