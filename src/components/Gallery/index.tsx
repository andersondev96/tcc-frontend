import { useCallback, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Modal from "react-modal";

interface PictureProps {
    original: string;
    thumbnail: string;
    description: string;
}

interface GalleryProps {
    images: PictureProps[];
    toogleFullScreen: () => void;
}

export const Gallery: React.FC<GalleryProps> = ({ images, toogleFullScreen }) => {
    const [showModal, setShowModal] = useState(true);

    const toogleModal = useCallback(() => {
        setShowModal(!showModal);
        toogleFullScreen();
    }, [toogleFullScreen]);

    const defaultImageStyle = {
        width: "auto",
        height: "360px",
        margin: "auto",
    };

    return (
        <Modal isOpen={showModal} onRequestClose={toogleModal} >
            <ImageGallery
                items={images}
                showPlayButton={false}
                showFullscreenButton={false}
                showNav={true}
                autoPlay={false}
                slideDuration={550}
                slideInterval={3000}
                showBullets={true}
                startIndex={0}
                renderItem={(item) => {
                    return (
                        <img
                            src={item.original}
                            alt={item.description}
                            style={defaultImageStyle}
                        />
                    )
                }}
            />
        </Modal>
    );
}