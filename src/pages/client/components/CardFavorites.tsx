import { useCallback, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import NoImageImg from "../../../assets/no-camera.png";
import api from "../../../services/api";
interface CardFavoritesProps {
    id: string;
    type: "company" | "service";
    image?: string | null;
    description: string;
    businessName?: string;
}

export const CardFavorites: React.FC<CardFavoritesProps> = (
    {
        id,
        type,
        image,
        description,
        businessName
    }
) => {
    const [favorite, setFavorite] = useState(true);

    const handleFavorite = useCallback(async () => {
        if (type === "company") {
            await api.get(`/companies/${id}`).then(response => {
                console.log(response.data);
                if (response.status === 200) {
                    if (favorite) {
                        api.patch(`/companies/favorites/unfavorite/${id}`).then(
                            () => setFavorite(false)
                        )
                    }
                }
            })
        } else {
            console.log(id);
            await api.get(`/services/${id}`).then(response => {
                if (response.status === 200) {
                    console.log('favorite');
                    if (favorite) {
                        api.patch(`/services/favorites/unfavorite/${id}`).then(
                            () => setFavorite(false)
                        )
                    }
                }
            })
        }
    }, [setFavorite]);

    const verifyIsFavorited = useCallback(() => {
        api.get(`users/favorite/${id}`).then((response) => {
            if (response.data.length > 0) {
                setFavorite(true);
            }
        })
    }, [setFavorite]);

    useEffect(() => {
        verifyIsFavorited();
    }, [verifyIsFavorited]);

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <>
            {favorite ? (
                <div className="flex items-center justify-center h-48 w-48 border-2 border-gray-500 rounded">
                    <img
                        src={image ? image : NoImageImg}
                        alt={description}
                        className={classNames(!image ? "h-24 w-24" : "h-48 w-48", "absolute object-cover")}
                    />
                    <div className={`flex flex-col justify-center p-2 absolute w-48 ${businessName ? 'h-16 mt-32' : 'h-8 mt-40'} bg-gray-500 bg-opacity-60`}>
                        <div className="flex flex-row items-center justify-between">
                            <span className="font-montserrat font-medium text-sm leading-3">{description}</span>
                            <AiFillHeart
                                size={16}
                                className="text-red-500 cursor-pointer hover:opacity-80 transition-opacity duration-300"
                                onClick={handleFavorite}
                            />
                        </div>
                        {businessName ? (
                            <Link to="/business">
                                <span className="font-montserrat font-semibold text-gray-300 text-sm">
                                    {businessName}
                                </span>
                            </Link>
                        ) : ('')}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}