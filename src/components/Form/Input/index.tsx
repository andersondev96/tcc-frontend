import { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from "react";
import { useField } from "@unform/core";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    value?: string | string[];
}

export const Input: React.FC<InputProps> = ({
    name,
    label,
    type = "text",
    placeholder,
    value,
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
        <>
            <label
                htmlFor={name}
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
                {label}
            </label>
            <input
                className={
                    `appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white
                    ${isFocused ? 'focus:border-blue-500' : ''}
                    ${isFilled ? 'focus:border-green-500' : ''}
                    ${error ? 'border-red-500' : ''}`}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                defaultValue={defaultValue}
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                ref={inputRef}
                {...rest}
            />

            {error && (
                <p className="text-red-500 text-xs italic">{error}</p>
            )}
        </>
    );
};
