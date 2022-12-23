import { useField } from "@unform/core";
import { useCallback, useEffect, useRef, useState } from "react";

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
        <div className="w-full px-3 mb-6">
            <label
                htmlFor={name}
                className="block font-inter font-semibold text-xs text-gray-100"
            >
                {label}
            </label>

            <input
                className={`appearance-none mt-2 block w-full border-2 rounded px-6 outline-0
          font-montserrat font-light text-[0.938rem] 
          ${isFocused ? "focus:border-blue-600" : ""}
          ${isFilled ? "border-green-400" : ""}
          ${error ? "border-red-200" : " border-black"}`}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                defaultValue={defaultValue}
                name={name}
                type={type}
                placeholder={placeholder}
                ref={inputRef}
            />

            {error && (
                <span className="font-montserrat font-light text-red-200 text-xs">
                    {error}
                </span>
            )}
        </div>
    );
};
