import { SideBar } from "../../../components/Sidebar";
import { Message } from "../components/Message";

import People1 from "../../../assets/people1.jpg";

export const ChatEntrepreneur: React.FC = () => {
    return (
        <div className="flex flex-row">
            <SideBar pageActive="chat" />
            <div className="flex flex-col w-full sm:ml-64">
                <div className="flex flex-col items-center py-6 sm:py-12">
                    <h1 className="font-montserrat font-medium text-2xl">
                        Chat
                    </h1>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex flex-col mt-2">
                        <span className="font-montserrat font-semibold text-lg">
                            Mensagens recentes
                        </span>
                        <div className="mt-4 flex flex-col gap-3">
                            <Message
                                img={People1}
                                name="Júlia Duarte"
                                last_message="Como faço para solicitar este serviço ?"
                                dateTime_of_last_message="06/07/2022 17:00"
                                cont_messages_not_read={2}
                            />

                            <Message
                                img={People1}
                                name="Júlia Duarte"
                                last_message="Como faço para solicitar este serviço ?"
                                dateTime_of_last_message="06/07/2022 17:00"
                                cont_messages_not_read={2}
                            />

                            <Message
                                img={People1}
                                name="Júlia Duarte"
                                last_message="Como faço para solicitar este serviço ?"
                                dateTime_of_last_message="06/07/2022 17:00"
                                cont_messages_not_read={2}
                                isActive={false}
                            />

                            <Message
                                img={People1}
                                name="Júlia Duarte"
                                last_message="Como faço para solicitar este serviço ?"
                                dateTime_of_last_message="06/07/2022 17:00"
                                cont_messages_not_read={2}
                                isActive={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
