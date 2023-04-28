import { AiFillHeart, AiOutlineCalculator, AiOutlineMail, AiOutlineWhatsApp } from 'react-icons/ai';
import { BiWorld } from "react-icons/bi";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import { Popup as PopupContainer } from "react-leaflet";
import { Link } from "react-router-dom";

import { useCallback, useEffect, useState } from "react";
import NoImageImg from "../../../assets/no-camera.png";
import { useAuth } from '../../../contexts/AuthContext';
import { ModalCalculate } from "../../../pages/client/components/ModalCalculate";
import api from '../../../services/api';
import { ModalChat } from "../../ModalChat";
import { ModalContainer } from "../../ModalContainer";
import './styles.scss';

interface IContact {
    telephone: string;
    email: string;
    whatsapp?: string;
    website?: string;
}
interface PopupProps {
    id: string;
    name: string;
    category: string;
    contact: IContact;
}

interface SettingsCompanyData {
    id: string;
    entrepreneur_id: string;
    company_logo: string;
    online_budget: string;
    online_chat: string;
}

export const Popup: React.FC<PopupProps> = ({ id, name, category, contact }) => {
    const { user } = useAuth();
    const [companyFavorited, setCompanyFavorited] = useState(false);
    const [modalCalculeIsOpen, setModalCalculateIsOpen] = useState(false);
    const [modalChatIsOpen, setModalChatIsOpen] = useState(false);
    const [settings, setSettings] = useState<SettingsCompanyData>({} as SettingsCompanyData);

    useEffect(() => {
        api.get(`/entrepreneurs/${id}`)
            .then((response) => {
                if (response.data) {
                    setSettings(response.data)
                }
            })
            .catch(err => console.log(err));
    }, [setSettings]);

    const verifyCompanyIsFavorited = useCallback(() => {
        api.get(`users/favorite/${id}`).then((response) => {
            if (response.data.length > 0) {
                setCompanyFavorited(true);
            }
        })
    }, [id, companyFavorited, setCompanyFavorited]);

    const handleFavoriteCompany = useCallback(async () => {
        if (!companyFavorited) {
            await api.patch(`/companies/favorites/${id}`);
            setCompanyFavorited(true);
        } else {
            await api.patch(`/companies/favorites/unfavorite/${id}`);
            setCompanyFavorited(false);
        }
    }, [id, setCompanyFavorited, companyFavorited]);

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

    useEffect(() => {
        user && verifyCompanyIsFavorited();
    }, [user, verifyCompanyIsFavorited, setCompanyFavorited]);

    return (
        <PopupContainer closeButton={false}>
            <div className="leaflet-popup-container">
                {
                    user && (
                        <div className="leaflet-popup-icon-like" onClick={handleFavoriteCompany}>
                            <AiFillHeart className={`icon-heart ${companyFavorited && 'favorited'}`} size={18} />
                        </div>
                    )
                }
                <Link to={`/business/${id}`}>
                    <div className="leaflet-popup-image-container">
                        <img
                            src={
                                settings && settings.company_logo
                                    ? `http://localhost:3333/company_logo/${settings.company_logo}`
                                    : NoImageImg
                            }
                            alt={name} className="image h-24 w-24 rounded"
                        />
                    </div>
                    <div className="leaflet-popup-description">
                        <h1>{name}</h1>
                        <span>{category}</span>
                    </div>
                </Link>
                <div className="leaflet-social-icons">
                    {contact?.website && (
                        <a href={contact.website} target="_blank">
                            <BiWorld size={16} />
                        </a>
                    )}
                    {
                        contact?.whatsapp && (
                            <a href={`https://wa.me/55${contact.whatsapp}`} target="_blank">
                                <AiOutlineWhatsApp size={16} />
                            </a>
                        )
                    }
                    <a href={`mailto:${contact.email}`} target="_blank">
                        <AiOutlineMail size={16} />
                    </a>

                    <MdOutlineChatBubbleOutline size={16} onClick={openModalChat} />

                    <AiOutlineCalculator size={16} onClick={openModalCalculate} />


                </div>
            </div>
            <ModalContainer
                title="Solicitar orçamento"
                isOpen={modalCalculeIsOpen}
                onRequestClose={closeModalCalculate}
            >
                <ModalCalculate
                    company_id={id}
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
        </PopupContainer>

    );
}