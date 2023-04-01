import { useEffect, useState } from "react";
import { NavBar } from "../../../components/NavBar/NavBar";
import api from "../../../services/api";
import { CardFavorites } from "../components/CardFavorites";
import { PreviousPageButton } from "../components/PreviousPageButton";

interface ICompany {
    id: string;
    name: string;
    image: string;
    favorites: number;
}

interface IService {
    id: string;
    name: string;
    image_url: string;
    company: string;
    favorites: number;
}
interface IFavoritesProps {
    companies: ICompany[];
    services: IService[];

}

export const Favorites: React.FC = () => {
    const [favorites, setFavorites] = useState<IFavoritesProps>({ companies: [], services: [] });

    useEffect(() => {
        api.get(`/users/favorites`).then((response) => {
            const { companies, services } = response.data;
            setFavorites({ companies, services });
        })
    }, []);

    return (
        <div className="flex flex-col">
            <NavBar />
            <div className="flex flex-col p-10">
                <PreviousPageButton />

                <div className="flex flex-col">
                    <h1 className="ffont-montserrat font-bold text-center text-2xl">Favoritos</h1>
                </div>

                <div className="flex flex-col gap-12 p-10">
                    <div className="flex flex-col gap-6 ">
                        <div className="flex flex-col py-2 w-full border-b border-gray-300 ">
                            <span className="font-montserrat font-semibold text-2xl">Negócios</span>
                        </div>
                        <div className="flex gap-7 flex-col sm:flex-row">
                            {
                                favorites.companies.map((company) => company && (

                                    <CardFavorites
                                        key={company.id}
                                        id={company.id}
                                        type="company"
                                        image={company.image}
                                        description={company.name}
                                    />
                                ))
                            }
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 ">
                        <div className="flex flex-col py-2 w-full border-b border-gray-300 ">
                            <span className="font-montserrat font-semibold text-2xl">Serviços</span>
                        </div>
                        <div className="flex gap-7 flex-col sm:flex-row">
                            {
                                favorites.services.map((service) => service && (
                                    <>
                                        <CardFavorites
                                            key={service.id}
                                            id={service.id}
                                            type="service"
                                            image={`http://localhost:3333/service/${service.image_url}`}
                                            description={service.name}
                                            businessName={service.company}
                                        />
                                    </>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}