import { useCallback, useRef, useState } from "react";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import getValidationErrors from "../utils/getValidateErrors";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ImArrowLeft } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import { Input } from "../components/Input";
import Banner from "../assets/image_onboarding.png";
import BusinessImg from "../assets/business_image.png";
import PurchaseImg from "../assets/purchase_image.png";
import { Button } from "../components/Button";
import api from "../services/api";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const navigate = useNavigate();
  const [type, setType] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  function handleNextStep() {
    console.log(selectedType);
    if (selectedType) {
      setType(true);
    }
  }

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string().email().required("E-mail obrigatório"),
          password: Yup.string()
            .required()
            .min(8, "A senha deve possuir no mínimo 8 dígitos"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post("/users", data);

        alert("Usuário criado com sucesso");
        navigate("/");
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
      }
    },
    [history]
  );

  return (
    <>
      {type ? (
        <div className="flex flex-row mobile:flex-col justify-between mobile:justify-start min-h-screen mobile:w-screen">
          <div className="flex w-1/2 h-screen mobile:h-48 mobile:w-full">
            <img
              src={Banner}
              alt="Banner"
              className="w-screen object-cover border-r-4 border-gray-300 mobile:border-none"
            />
          </div>
          <div className="flex flex-col items-center mobile:items-start justify-center w-1/2 bg-blue-900 mobile:bg-white mobile:w-screen">
            <Link className="mobile:hidden" to="/">
              <div className="flex flex-row items-center gap-2">
                <ImArrowLeft color="#FFFFFF" />
                <span className="font-montserrat text-white tex-mobile">
                  Voltar
                </span>
              </div>
            </Link>
            <div className="flex flex-col bg-white h-[34.188rem] w-[28.5rem] rounded mt-4 mobile:mt-0">
              <div className="flex items-center p-8 h-[4.125rem] w-full mobile:w-screen rounded-t mobile:rounded-none bg-indigo-600">
                <span className="font-inter font-medium uppercase text-white text-2xl">
                  Cadastrar
                </span>
              </div>

              <div className="flex flex-col mt-8">
                <Form
                  className="flex flex-col items-center gap-2"
                  ref={formRef}
                  onSubmit={handleSubmit}
                >
                  <Input
                    name="name"
                    label="Nome"
                    placeholder="Digite o seu nome"
                  />
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

                  <button
                    type="submit"
                    className="flex items-center justify-center mt-6 gap-3 bg-indigo-400 w-40 h-12 rounded hover:brightness-90 transition-opacity"
                  >
                    <FiSave size={24} color="#FFFFFF" />
                    <span className="font-inter text-lg text-white uppercase">
                      Salvar
                    </span>
                  </button>
                </Form>

                <div className="flex flex-row items-center gap-[0.938rem] px-[3.875rem] mt-8 cursor-pointer hover:brightness-90">
                  <FcGoogle size={24} />
                  <span className="font-montserrat font-semibold text-sm">
                    Cadastrar com o Google
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center pt-[3.25rem] min-h-screen min-w-screen bg-blue-900">
          <h1 className="font-inter font-medium mobile:text-center text-4xl mobile:text-2xl text-white">
            Qual o seu objetivo com a plataforma?
          </h1>
          <div className="flex flex-row mobile:flex-col items-center justify-center gap-[8.25rem] mobile:gap-[4.125rem] mt-[3.625rem]">
            <div
              className="flex flex-col items-center justify-center gap-6 mobile:gap-3"
              onClick={() => {
                setSelectedType("Compra");
              }}
            >
              <img
                src={PurchaseImg}
                alt=""
                className="h-[18.75rem] w-[18.75rem] mobile:h-[12.5rem] mobile:w-[12.5rem] rounded-full border-4 border-gray-600  hover:border-blue-400 duration-200"
              />
              <span className="font-inter text-3xl text-white uppercase">
                Compra
              </span>
            </div>

            <div
              className="flex flex-col items-center justify-center gap-6"
              onClick={() => {
                setSelectedType("Venda");
              }}
            >
              <img
                src={BusinessImg}
                alt=""
                className="h-[18.75rem] w-[18.75rem] mobile:h-[12.5rem] mobile:w-[12.5rem] rounded-full border-4 border-gray-600 hover:border-blue-400 duration-200"
              />
              <span className="font-inter text-3xl text-white uppercase">
                Venda
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center mt-12 text-white">
            <Button onClick={handleNextStep}>
              <span className="font-inter font-semibold text-xl uppercase">
                Avançar
              </span>
              <AiOutlineArrowRight size={24} />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
