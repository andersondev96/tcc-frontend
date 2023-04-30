import { format } from "date-fns";

interface MessageProps {
    userAvatar: string;
    message: string;
    dateMessage: string;
    activeUser?: boolean;
}

export const Message: React.FC<MessageProps> = ({ userAvatar, message, dateMessage, activeUser = false }) => {

    function classNames(...classes: any): any {
        return classes.filter(Boolean).join(" ");
    }

    return (
        <div className="flex flex-row items-center gap-5">
            <img src={userAvatar} alt="" className="h-9 w-9 object-fill rounded-full" />
            <div className="flex flex-col gap-1">
                <div className={classNames(activeUser ? 'bg-blue-400 border border-blue-200' : 'bg-gray-100 border border-gray-200', 'flex items-center p-3 h-full rounded')}>
                    <span className="font-montserrat text-sm">
                        {message}
                    </span>
                </div>
                <p className="font-light text-xs text-gray-800">{format(new Date(dateMessage), "dd/MM/yyyy HH:mm")}</p>
            </div>
        </div>
    );
}