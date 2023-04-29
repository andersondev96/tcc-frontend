
interface ConnectionsData {
    id: string;
    socket_id: string;
    createdAt: Date;
    user: {
        id: string;
        name: string;
        email: string;
        avatar: string;
    }
    user_id: string;
}

interface ContactsChatProps {
    connections: ConnectionsData[] | undefined;
    handleLoadingMessage: (idUser: string) => void;
}
export const ContactsChat: React.FC<ContactsChatProps> = ({ connections, handleLoadingMessage }) => {

    return (
        <div className="flex flex-col mt-8">
            <span className="text-gray-700">Selecione um contato para iniciar o bate-papo</span>
            <ul className="flex flex-col mt-8">
                {connections && connections.map(connection => (
                    <li
                        className="flex flex-row items-center gap-4 p-4 border-b-2 border-gray-600 border-opacity-25 hover:bg-gray-200 duration-300 transition-all cursor-pointer"
                        id={`user_${connection.id}`}
                        key={connection.id}
                        onClick={() => handleLoadingMessage(connection.id)}
                    >
                        {connection.user && connection.user.avatar ? (
                            <img
                                className="rounded-full w-12 h-12 object-fill"
                                src={connection.user.avatar}
                            />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#9ca3af" className="w-12 h-12">
                                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                            </svg>
                        )}

                        <span className="font-semibold">{connection.user.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}