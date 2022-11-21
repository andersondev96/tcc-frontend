
interface ParagraphProps {
  title: string;
  text: string;
}

export const Paragraph: React.FC<ParagraphProps> = ({ title, text }) => {
  return (
    <div className="flex flex-col gap-2 mobile:gap-1">
      <span className="font-inter font-semibold text-gray-700">
        { title }
      </span>
      <p className="font-inter leading-5 text-justify">
        { text }
      </p>
    </div>
  )
}