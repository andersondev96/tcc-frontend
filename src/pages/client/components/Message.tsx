
interface MessageProps {
    userAvatar: string;
    message: string;
}

export const Message: React.FC<MessageProps> = ({ userAvatar, message }) => {
    return (
        <div className="flex flex-row items-center gap-5">
            <img src={userAvatar} alt="" className="h-9 w-9 object-fill rounded-full" />
            <div className={`flex items-center p-3 h-full bg-gray-100 border border-gray-200 rounded`}>
                <span className="font-montserrat text-sm">
                    {message}
                </span>
            </div>
        </div>
    );
}