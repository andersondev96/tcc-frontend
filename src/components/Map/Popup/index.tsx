import { Popup as PopupContainer } from "react-leaflet";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineCalculator, AiOutlineMail, AiOutlineWhatsApp } from 'react-icons/ai';
import { BiWorld } from "react-icons/bi";
import { MdOutlineChatBubbleOutline } from "react-icons/md";

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
    image: string;
}
export const Popup: React.FC<PopupProps> = ({ id, name, category, contact, image }) => {
    return (
        <PopupContainer closeButton={false}>
            <div className="leaflet-popup-container">
                <div className="leaflet-popup-icon-like">
                    <AiFillHeart className="icon-heart" size={18} />
                </div>
                <Link to={`/business/${id}`}>
                    <div className="leaflet-popup-image-container">
                        <img src={image} alt={name} className="image h-24 w-24 rounded" />
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
                    <a href={contact.email} target="_blank">
                        <AiOutlineMail size={16} />
                    </a>
                    <MdOutlineChatBubbleOutline size={16} />
                    <AiOutlineCalculator size={16} />
                </div>
            </div>
        </PopupContainer>

    );
}