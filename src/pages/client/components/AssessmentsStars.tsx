import { useState } from "react";
import { AiFillStar } from "react-icons/ai";

interface AssessmentsStarsProps {
  stars?: number;
  mode?: 'view' | 'edit';
}

export const AssessmentsStars: React.FC<AssessmentsStarsProps> = ({ stars = 0, mode = 'view' }) => {
  const totStars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState<undefined | number>(undefined);

  function handleClick(value: number) {
    setCurrentValue(value);
  }

  function handleMouseOver(value: number) {
    setHoverValue(value);
  }

  function handleMouseLeave() {
    setHoverValue(undefined);
  }

  return (
    <div className="flex flex-row items-center gap-[0.25rem]">
      {totStars.map((_, index) => {

        return (
          mode === 'edit' ? (
            <AiFillStar
              key={index}
              className="cursor-pointer"
              size={16}
              color={`${(hoverValue || currentValue) > index ? 'rgba(47,90,199)' : 'rgba(47,90,199,0.4)'}`}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
            />
          ) : (
            <AiFillStar
              key={index}
              size={16}
              color={`${(stars) <= index ? 'rgba(47,90,199, 0.4)' : 'rgba(47,90,199)'}`}
            />
          )
        )
      })}
    </div>
  );
}