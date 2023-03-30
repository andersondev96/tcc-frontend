import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import AvatarImg from "../../../assets/user.png";
import api from "../../../services/api";
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

interface AssessmentFormProps {
    table_id: string;
    assessment_type: string;
    avatar_url?: string;
    onAddAssessment: (newAssessment: Assessment) => void;
}

export const AssessmentsForm: React.FC<AssessmentFormProps> = ({ table_id, assessment_type, onAddAssessment, avatar_url }) => {
    const [comment, setComment] = useState("");
    const [stars, setStars] = useState(0);

    const handleSubmit = useCallback(async (event: FormEvent) => {
        event.preventDefault();

        if (assessment_type === "company") {
            const response = await api.post(`/assessments/company/${table_id}`, {
                comment,
                stars
            });

            if (response.status === 201) {
                const newAssessment: Assessment = response.data;
                onAddAssessment(newAssessment);
                setComment("");
                setStars(0);
            }
        } else if (assessment_type === "service") {
            const response = await api.post(`/assessments/service/${table_id}`, {
                comment,
                stars
            });

            if (response.status === 201) {
                const newAssessment: Assessment = response.data;
                onAddAssessment(newAssessment);
                setComment("");
                setStars(0);
            }
        }

    }, [comment, stars, table_id, onAddAssessment]);

    const handleInputChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
    }, []);


    return (
        <div className="flex flex-col gap-8">
            <form className="flex flex-col gap-4" method="get" onSubmit={handleSubmit} action="">
                <div className="flex flex-row items-center gap-6">
                    <img
                        src={avatar_url || AvatarImg}
                        alt="avatar"
                        className="w-6 h-6 sm:h-10 sm:w-10 rounded-full"
                    />
                    <textarea
                        name="assessment"
                        placeholder="Escreva aqui o seu comentário"
                        onChange={handleInputChange}
                        value={comment}
                        className="w-72 p-2 sm:w-116 sm:h-16 resize-none rounded border-2 border-gray-400 outline-0 focus:border-indigo-600 font-inter text-sm text-gray-700"

                    />
                </div>
                <div className="px-14 sm:px-20 flex flex-col gap-2">
                    <span className="font-inter font-semibold text-sm text-gray-700">Classificação</span>
                    <AssessmentsStars
                        mode="edit"
                        stars={stars}
                        setStars={setStars}
                    />
                </div>
                <button className="ml-14 sm:ml-20 w-32 h-11 sm:w-24 sm:h-10 bg-indigo-600 rounded text-white font-inter font-medium text-lg hover:brightness-90 transition-opacity">
                    Enviar
                </button>
            </form>
        </div>

    )
}