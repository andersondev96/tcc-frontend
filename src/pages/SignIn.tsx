import { Link, useNavigate } from 'react-router-dom';
import { ImArrowLeft } from "react-icons/im";
import { BiLogIn } from 'react-icons/bi'
import { FcGoogle } from 'react-icons/fc';
import Banner from '../assets/image_onboarding.png';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const SignIn: React.FC = () => {
  const navigate = useNavigate();


  return (
    <div className="flex flex-row mobile:flex-col justify-between mobile:justify-start min-h-screen mobile:w-screen">
      <div className="flex w-1/2 h-screen mobile:h-48 mobile:w-full">
        <img
          src={Banner}
          alt="Banner"
          className="w-screen object-cover border-r-4 border-gray-300 mobile:border-none"
        />
      </div>
      <div className="flex flex-col items-center mobile:items-start justify-center w-1/2 bg-blue-900 mobile:bg-white mobile:w-screen">
        <Link
          className="mobile:hidden"
          to="/"
        >
          <div className="flex flex-row items-center gap-2">
            <ImArrowLeft color="#FFFFFF" />
            <span className="font-montserrat text-white tex-mobile">Voltar</span>
          </div>
        </Link>
        <div className="flex flex-col bg-white h-[34.188rem] w-[28.5rem] rounded mt-4 mobile:mt-0">
          <div className="flex items-center p-8 h-[4.125rem] w-full mobile:w-screen rounded-t mobile:rounded-none bg-indigo-600">
            <span className="font-inter font-medium uppercase text-white text-2xl">
              Login
            </span>
          </div>

          <div className="flex flex-col mt-[4.75rem]">
            <form className="flex flex-col items-center gap-[1.75rem]">
              <Input
                name="email"
                label="E-mail"
                placeholder="Digite o seu e-mail"
              />
              <Input
                name="password"
                label="Senha"
                type="password"
                placeholder="Digite a sua senha"
              />

              <Button
                onClick={() => navigate("/home")}
              >

                <BiLogIn size={24} color="#FFFFFF" />
                <span
                  className="font-inter text-lg text-white uppercase"
                >
                  Entrar
                </span>

              </Button>
            </form>


            <div className="flex flex-row justify-between mt-12 px-[3.875rem]">
              <span
                className="font-montserrat font-light text-sm text-indigo-200 cursor-pointer hover:brightness-90 hover:underline"
              >
                Esqueci a senha
              </span>

              <Link to="/sign-up">
                <span
                  className="font-montserrat font-light text-sm text-indigo-200 cursor-pointer hover:brightness-90 hover:underline"
                >
                  Cadastrar
                </span>
              </Link>
            </div>

            <div className="flex flex-row items-center gap-[0.938rem] px-[3.875rem] mt-10 cursor-pointer hover:brightness-90">
              <FcGoogle size={24} />
              <span className="font-montserrat font-semibold text-sm">Entrar com o Google</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
