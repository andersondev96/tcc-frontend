
import { useEffect, useState } from 'react';
import { AiOutlineCalculator, AiOutlineMail, AiOutlineWhatsApp } from 'react-icons/ai';
import { BiWorld } from 'react-icons/bi';
import { MdOutlineChatBubbleOutline } from 'react-icons/md';
import NoImageImg from '../../../assets/no-camera.png';
import { ModalChat } from '../../../components/ModalChat';
import { ModalContainer } from "../../../components/ModalContainer";
import { useAuth } from '../../../contexts/AuthContext';
import api from '../../../services/api';
import { AssessmentsStars } from './AssessmentsStars';
import { ModalCalculate } from './ModalCalculate';

interface ISchedules {
    id: string;
    weekday: string;
    opening_time: string;
    closing_time: string;
}

interface IContact {
    telephone: string;
    whatsapp?: string;
    email: string;
    website?: string;
}

interface IAddress {
    city: string;
    state: string;
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
    ImageCompany: ImageCompany[];
    Address: IAddress;
    Schedule: ISchedules[];
}

interface Category {
    id: string;
    name: string;
}

interface SettingsCompanyData {
    id: string;
    entrepreneur_id: string;
    online_budget: string;
    online_chat: string;
}
interface BusinessHeaderProps {
    company: Company;
    // isOpen: boolean;
}

export const BusinessHeader: React.FC<BusinessHeaderProps> = ({ company }) => {
    const { authenticated } = useAuth();
    const [modalCalculeIsOpen, setModalCalculateIsOpen] = useState(false);
    const [modalChatIsOpen, setModalChatIsOpen] = useState(false);
    const [category, setCategory] = useState<Category>({} as Category);
    const [settings, setSettings] = useState<SettingsCompanyData>({} as SettingsCompanyData);

    useEffect(() => {
        if (company.category_id) {
            api.get<Category>(`/categories/${company.category_id}`)
                .then((response) => setCategory(response.data))
                .catch(err => console.log(err));

        }

        if (company.id) {
            api.get(`/entrepreneurs/${company.id}`)
                .then((response) => setSettings(response.data))
                .catch(err => console.log(err));
        }

    }, [company.category_id, company.id]);

    function openModalCalculate() {
        setModalCalculateIsOpen(true);
    }

    function closeModalCalculate() {
        setModalCalculateIsOpen(false);
    }

    function openModalChat() {
        setModalChatIsOpen(true);
    }

    function closeModalChat() {
        setModalChatIsOpen(false);
    }

    return (
        <div className="w-full border-b-2 border-gray-500">
            <div className="flex flex-row mobile:flex-col gap-12 px-16 py-8 mobile:py-4">
                <div className="flex flex-row">
                    <img
                        src={
                            company.ImageCompany && company.ImageCompany.length > 0 ?
                                company.ImageCompany[0].image_url
                                : NoImageImg
                        }
                        alt="Coffee"
                        className="h-[6.25rem] w-[6.25rem] mobile:h-[3.125rem] mobile:w-[3.125rem] object-fill rounded-full"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex flex-row items-center justify-between">
                        <span className="font-inter font-bold text-[1.475rem] mobile:text-mobile text-gray-700">{company.name}</span>
                        {/* {isOpen ? (
                            <span className="w-[4.75rem] h-[2.125rem] bg-green-500 flex items-center justify-center rounded-full font-inter font-semibold text-sm text-white">
                                Aberto
                            </span>
                        ) : (
                            <span className="w-[4.75rem] h-[2.125rem] bg-red-500 flex items-center justify-center rounded-full font-inter font-semibold text-sm text-white">
                                Fechado
                            </span>
                        )
                        } */}
                    </div>

                    <div className="flex flex-col">
                        {
                            company.Address ? (
                                <span className="font-inter text-sm">{category.name} em {company.Address.city} - {company.Address.state}</span>
                            ) : ''
                        }
                        <div className="flex flex-row mt-2 gap-4">
                            <div className="flex flex-row items-center gap-[0.25rem]">
                                <AssessmentsStars stars={company.stars} />
                            </div>
                            <span
                                className="font-inter font-semibold text-sm text-gray-700"
                            >
                                {company.stars}
                            </span>
                        </div>
                    </div>

                    {
                        company.contact && (
                            <div className="flex flex-row items-center gap-[1.25rem] mobile:gap-2 mt-4">
                                <a href={company.contact.website} target="_blank">
                                    <BiWorld size={24}
                                        color="#4072F3"
                                        className="hover:brightness-90 transition-colors mobile:w-6"
                                    />
                                </a>

                                <a href={`mailto:${company.contact.email}`}>
                                    <AiOutlineMail
                                        size={24}
                                        color="#547DE5"
                                        className="hover:brightness-90 transition-colors mobile:w-6"
                                    />
                                </a>

                                <a href={`https://wa.me/55${company.contact.whatsapp}`} target="_blank">
                                    <AiOutlineWhatsApp
                                        size={24}
                                        color="#1EBF1B"
                                        className="hover:brightness-90 transition-colors mobile:w-6"
                                    />
                                </a>

                                {authenticated && settings.online_chat && (
                                    <MdOutlineChatBubbleOutline
                                        size={24}
                                        color="#EB1B2E"
                                        className="hover:brightness-90 transition-colors cursor-pointer mobile:w-6"
                                        onClick={openModalChat}
                                    />
                                )}

                                {
                                    authenticated && settings.online_budget && (
                                        <AiOutlineCalculator
                                            size={24}
                                            color="#28267C"
                                            className="hover:brightness-90 transition-colors cursor-pointer mobile:w-6"
                                            onClick={openModalCalculate}
                                        />
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </div>

            <ModalContainer
                title="Solicitar orçamento"
                isOpen={modalCalculeIsOpen}
                onRequestClose={closeModalCalculate}
            >
                <ModalCalculate
                    company_id={company.id}
                    close_modal={closeModalCalculate}
                />
            </ModalContainer>

            <ModalContainer
                title="Singhtglass Coffee"
                isOpen={modalChatIsOpen}
                onRequestClose={closeModalChat}
            >
                <ModalChat />
            </ModalContainer>
        </div>
    )
} 