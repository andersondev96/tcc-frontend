interface PictureProps {
  image: string;
  description: string;
}

export const Pictures: React.FC<PictureProps> = ({ image, description }) => {
  return (
      <img
        src={image}
        alt={description}
        className="w-[6.25rem] h-16 object-cover rounded"
      />
  );
}