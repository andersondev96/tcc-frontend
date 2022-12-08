import { useField } from "@unform/core";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

interface InputProps {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
}

export const Input: React.FC<InputProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <div className="flex flex-col gap-1 w-80">
      <label
        htmlFor={name}
        className="font-inter font-semibold text-sm text-indigo-600"
      >
        {label}
      </label>

      <input
        className="h-10 border-2 border-black rounded px-6 outline-0 focus:border-indigo-600 font-montserrat font-light text-[0.938rem]"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        name={name}
        type={type}
        placeholder={placeholder}
        ref={inputRef}
      />
    </div>
  );
};
