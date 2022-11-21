import {  Popup as PopupContainer } from "react-leaflet";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineCalculator, AiOutlineMail, AiOutlineWhatsApp } from 'react-icons/ai';
import { BiWorld } from "react-icons/bi";
import { MdOutlineChatBubbleOutline } from "react-icons/md";

import './styles.scss';

interface PopupProps {
  image: string;
  name: string;
  category: string;
}
export const Popup: React.FC<PopupProps> = ({ image, name, category }) => {
  return (
    <PopupContainer closeButton={false}>
      <div className="leaflet-popup-container">
        <div className="leaflet-popup-icon-like">
          <AiFillHeart className="icon-heart" size={18} />
        </div>
        <Link to="/business">
          <div className="leaflet-popup-image-container">
            <img src={image} alt={name} className="image" />
          </div>
          <div className="leaflet-popup-description">
            <h1>{name}</h1>
            <span>{category}</span>
          </div>
        </Link>
        <div className="leaflet-social-icons">
          <BiWorld size={16} />
          <AiOutlineWhatsApp size={16} />
          <AiOutlineMail size={16} />
          <MdOutlineChatBubbleOutline size={16} />
          <AiOutlineCalculator size={16} />
        </div>
      </div>
    </PopupContainer>

  );
}