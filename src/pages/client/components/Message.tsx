
interface MessageProps {
  send: "business" | "client";
  userAvatar: string;
  message: string;
}

export const Message: React.FC<MessageProps> = ({ send, userAvatar, message }) => {
  return (
    <div className="flex flex-row items-center gap-5">
      <img src={userAvatar} alt="" className="h-9 w-9 object-fill rounded-full" />
      <div className={`flex items-center p-[0.938rem] w-[22.5rem] h-full ${send === 'business' ? 'bg-blue-200' : 'bg-gray-300'} rounded`}>
        <span className="font-montserrat text-sm">
          {message}
        </span>
      </div>
    </div>
  );
}