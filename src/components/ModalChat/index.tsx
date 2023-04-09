import { io } from "socket.io-client";
import { WelcomeChat } from "./components/WelcomeChat";

export const ModalChat: React.FC = () => {
    const socket = io("http://localhost:3333");

    socket.on("connect", () => {
        console.log(socket.id);
    })

    return (
        <div className="flex flex-col h-full justify-between px-12 py-16">
            <WelcomeChat />
            {/* <MessageChat /> */}
        </div>
    );
}