import { Link, useNavigate } from 'react-router-dom';
import Banner from '../assets/image_onboarding.png';
import IconBusiness from '../assets/icon_onboarding.png';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row mobile:flex-col justify-between mobile:justify-start min-h-screen mobile:w-screen">
      <div className="flex w-1/2 h-screen mobile:h-full mobile:w-full">
        <img
          src={Banner}
          alt="Banner"
          className="mobile:h-48 w-screen object-cover border-r-4 border-gray-300 mobile:border-none"
        />
      </div>
      <div className="flex flex-col align-center justify-center w-1/2 mobile:w-screen p-4 bg-blue-900">
        <div className="flex align-center justify-center mt-[1rem]">
          <h1
            className="font-montserrat font-medium text-[2.6rem] mobile:text-3xl text-white leading-tight text-center"
          >
            Faça um bom <br />
            negócio <br />
            e ajude um <br />
            pequeno <br />
            empreendedor
          </h1>
        </div>

        <div className="flex items-center justify-center mt-4">
          <img 
            src={IconBusiness} 
            alt="" 
            className="h-44 opacity-40"
          />
        </div>

        <div className="flex flex-row items-center justify-center mt-4 mobile:mt-8 gap-16 mobile:gap-10">
          <button
            onClick={() => navigate("/login")} 
            className="bg-indigo-400 w-36 h-12 rounded font-inter text-lg text-white hover:bg-white hover:border hover: border-white hover:text-white hover:bg-transparent transition-colors"
          >
            Entrar
          </button>
          <button 
            onClick={() => navigate("/sign-up")}
            className="border border-white w-36 h-12 rounded font-inter text-lg text-white hover:bg-indigo-400 hover:text-white hover:border-transparent transition-colors"
          >
            Cadastrar
          </button>
        </div>
        <div className="flex flex-col items-center justify-center mt-6">
            <span className="font-montserrat font-light text-sm text-white">ou</span>
            <Link to="/home" className="font-montserrat font-light text-sm text-white cursor-pointer hover:underline">
              Entre sem cadastrar
            </Link>
          </div>
      </div>
    </div>
  )
}
