
interface ParagraphProps {
    title: string;
    text: string | string[];
    link?: string;
}

export const Paragraph: React.FC<ParagraphProps> = ({ title, text, link }) => {
    return (
        <div className="flex flex-col">
            <span className="font-inter font-semibold text-gray-700">
                {title}
            </span>
            {link ? (
                <a
                    className="cursor-pointer hover:underline hover:text-blue-600"
                    target="_blank"
                    href={link}
                >
                    {text}
                </a>
            ) : (
                <p className="font-inter leading-5 text-justify">
                    {text}
                </p>
            )}
        </div>
    )
}