import { useField } from "@unform/core";
import { ChangeEvent, InputHTMLAttributes, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    value: string;
    placeholder?: string;
    inputChanges: (event: ChangeEvent<HTMLInputElement>) => void;
    inputKeydown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export const TagInput: React.FC<InputProps> = ({
    name,
    label,
    value,
    placeholder,
    inputChanges,
    inputKeydown,
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
                id={name}
                name={name}
                placeholder={placeholder}
                type="text"
                value={value}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={inputChanges}
                onKeyDown={inputKeydown}
                className={
                    `appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white
                        ${isFocused ? 'focus:border-blue-500' : ''}
                        ${isFilled ? 'focus:border-green-500' : ''}
                        ${error ? 'border-red-500' : ''}`}
                ref={inputRef}
                {...rest}
            />
        </>
    )
}