import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import AvatarImg from "../../../assets/user.png";
import api from "../../../services/api";
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

interface User {
    id: string;
    name: string;
    avatar: string;
}

interface IContact {
    telephone: string;
    whatsapp?: string;
    email: string;
    website?: string;
}
interface IAddress {
    street: string;
    district: string;
    number: string;
    state: string;
    city: string;
    cep: string;
    lat: number;
    lng: number;
}

interface ISchedules {
    id: string;
    weekday: string;
    opening_time: string;
    closing_time: string;
}

interface ImageCompany {
    id: string;
    image_url: string;
}

interface Company {
    id: string;
    name: string;
    description: string;
    category_id: string;
    services: string[];
    stars: number;
    contact: IContact;
    physical_localization: boolean;
    ImageCompany: ImageCompany[];
    Address: IAddress;
    Schedule: ISchedules[];
}

interface Service {
    id: string;
    name: string;
    category: string;
    description: string;
    stars: number;
    favorites: number;
    image_url: string;
    price: number;
    company_id: string;
    highlight_service: boolean;
}

interface AssessmentFormProps {
    table_id: string;
    assessment_type: string;
    user: User;
    onAddAssessment: (newAssessment: Assessment) => void;
    updateCompany?: (newAssessmentStars: number) => void;
    setCompany?: Dispatch<SetStateAction<Company>>;
    setService?: Dispatch<SetStateAction<Service>>;
}

export const AssessmentsForm: React.FC<AssessmentFormProps> = ({ table_id, assessment_type, onAddAssessment, user, setCompany, setService }) => {
    const [comment, setComment] = useState("");
    const [stars, setStars] = useState(0);
    const params = useParams();
    const [hasComment, setHasComment] = useState(false);

    const handleSubmit = useCallback(async (event: FormEvent) => {
        event.preventDefault();

        if (assessment_type === "company") {
            const response = await api.post(`/assessments/company/${table_id}`, {
                comment,
                stars,
            });

            if (response.status === 201) {
                const newAssessment: Assessment = {
                    ...response.data,
                    name: user.name,
                    avatar: user.avatar,
                };

                onAddAssessment(newAssessment);
                setComment("");
                setStars(0);

                const companyUpdated = await api.get(`/companies/${table_id}`);

                if (setCompany && companyUpdated.data) {
                    setCompany(companyUpdated.data);
                }
            }

        } else if (assessment_type === "service") {
            const response = await api.post(`/assessments/service/${table_id}`, {
                comment,
                stars
            });

            if (response.status === 201) {
                const newAssessment: Assessment = {
                    ...response.data,
                    name: user.name,
                    avatar: user.avatar,
                };

                onAddAssessment(newAssessment);
                setComment("");
                setStars(0);

                const serviceUpdated = await api.get(`/services/${table_id}`);

                if (setService && serviceUpdated.data) {
                    setService(serviceUpdated.data);
                }
            }
        }


        setHasComment(false);

    }, [comment, stars, setStars, table_id, onAddAssessment, setCompany, setService]);

    const handleInputChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);

        if (event.target.value.length > 0) {
            setHasComment(true);
        } else {
            setHasComment(false);
        }

    }, []);

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }


    return (
        <div className="flex flex-col gap-8">
            <form className="flex flex-col gap-4" method="get" onSubmit={handleSubmit} action="">
                <div className="flex flex-row items-center gap-6">
                    <img
                        src={user.avatar &&
                            `http://localhost:3333/avatar/${user.avatar}` || AvatarImg}
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
                <button
                    disabled={!hasComment}
                    className={
                        classNames(!hasComment ? "bg-gray-300 text-gray-800 cursor-not-allowed" : "bg-indigo-600 text-white hover:brightness-90 transition-opacity",
                            "ml-14 sm:ml-20 w-32 h-11 sm:w-24 sm:h-10 rounded font-inter font-medium text-lg"
                        )}

                >
                    Enviar
                </button>
            </form>
        </div>

    )
}