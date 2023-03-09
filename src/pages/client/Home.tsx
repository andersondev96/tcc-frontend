import { NavBar } from "../../components/NavBar/NavBar";
import { Map } from "../../components/Map";

export const Home: React.FC = () => {
    /*  const { user, signInWithGoogle, signOutWithGoogle } = useAuthWithGoogle(); */
    return (

        <div>
            <NavBar pageCurrent="home" />

            <div className="flex flex-col w-screen h-screen">
                <div className="flex items-center justify-center py-2 bg-gray-600 bg-opacity-60">
                    <span className="font-medium text-white">Selecione um ponto no mapa para ver algum empreendimento</span>
                </div>
                <Map />
            </div>
        </div>
    );
};