import React from "react";
import { SideBar } from "../../../components/Sidebar";
import { Message } from "../components/Message";

import People1 from "../../../assets/people1.jpg";
import Coffee from "../../../assets/coffee.png";
import { FiSend } from "react-icons/fi";

export const ChatMessageEntrepreneur: React.FC = () => {
  return (
    <div className="flex flex-row">
      <SideBar />
      <div className="flex flex-col w-full sm:ml-64">
        <div className="flex flex-col items-center py-[1.5rem] mobile:py-[1.75rem] mobile:items-center">
          <h1 className="font-montserrat font-medium text-2xl mobile:text-center">
            Chat
          </h1>
        </div>
        <div className="flex flex-col items-center gap-4 py-6 mobile:py-2">
          <div className="flex flex-col mt-2">
            <div className="flex flex-col w-[60.25rem] mobile:w-80  border border-gray-400 rounded">
              <div className="flex items-center justify-center h-12 bg-blue-200">
                <span className="font-montserrat font-semibold text-xl text-white">
                  Júlia Duarte
                </span>
              </div>
              <div className="flex flex-col max-h-[25.5rem] p-6 overflow-auto">
                <div className="flex flex-row items-center gap-4">
                  <img
                    src={People1}
                    alt="People 1"
                    className="w-9 h-9 mobile:w-8 mobile:h-8 rounded-full object-fill"
                  />
                  <div className="flex flex-col items-end mt-2">
                    <div className="w-80 h-full bg-gray-300 rounded p-3 mobile:w-56">
                      <p className="font-montserrat font-normal text-sm">
                        Boa tarde, tudo bem?
                      </p>
                    </div>
                    <p className="font-montserrat font-regular text-xs mt-[0.125rem] mr-4">
                      06/07/2022 17:00
                    </p>
                  </div>
                </div>

                <div className="flex flex-row items-center gap-4">
                  <div className="flex flex-col items-end mt-2 px-14 mobile:px-12">
                    <div className="w-80 h-full bg-gray-300 rounded p-3 mobile:w-56">
                      <p className="font-montserrat font-normal text-sm">
                        Como faço para solicitar este serviço?
                      </p>
                    </div>
                    <p className="font-montserrat font-regular text-xs mt-[0.125rem] mr-4">
                      06/07/2022 17:00
                    </p>
                  </div>
                </div>

                <div className="flex flex-row items-center gap-4 mt-6">
                  <img
                    src={Coffee}
                    alt="People 1"
                    className="w-9 h-9 mobile:w-8 mobile:h-8 rounded-full object-fill"
                  />
                  <div className="flex flex-col items-end mt-2">
                    <div className="w-80 h-full bg-blue-300 rounded p-3 mobile:w-56">
                      <p className="font-montserrat font-normal text-sm">
                        Boa tarde Júlia, tudo bem e você?
                      </p>
                    </div>
                    <p className="font-montserrat font-regular text-xs mt-[0.125rem] mr-4">
                      06/07/2022 17:00
                    </p>
                  </div>
                </div>

                <div className="flex flex-row items-center gap-4">
                  <div className="flex flex-col items-end mt-2 px-14 mobile:px-12">
                    <div className="w-80 h-full bg-blue-300 rounded p-3 mobile:w-56">
                      <p className="font-montserrat font-normal text-sm">
                        Por aqui mesmo você consegue solicitar os nossos
                        serviços, qual seria o serviço desejado ?
                      </p>
                    </div>
                    <p className="font-montserrat font-regular text-xs mt-[0.125rem] mr-4">
                      06/07/2022 17:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between bg-gray-300 rounded w-[60.25rem] h-14 mobile:w-80">
            <textarea
              className="w-full rounded resize-none pr-16 bg-gray-300 border-none font-montserrat text-sm focus:outline-0 "
              placeholder="Digite a sua mensagem aqui"
            />
            <button className="flex absolute ml-[56.75rem] mobile:ml-64">
              <FiSend size={32} color="#08A358" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
