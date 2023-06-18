import { useField } from "@unform/core";
import { FormEvent, InputHTMLAttributes, useCallback, useEffect, useRef, useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "../../Tooltip";
import { cep, cnpj, currency, phone } from "./masks";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    type?: string;
    mask?: "cep" | "currency" | "cnpj" | "phone";
    placeholder?: string;
    idTooltip?: string | undefined;
    tooltipText?: string;
}

export const Input: React.FC<InputProps> = ({
    name,
    label,
    type = "text",
    mask,
    placeholder,
    idTooltip = undefined,
    tooltipText,
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

    const handleKeyUp = useCallback((event: FormEvent<HTMLInputElement>) => {

        if (mask === 'cep') {
            cep(event);
        }

        if (mask === 'currency') {
            currency(event);
        }

        if (mask === 'cnpj') {
            cnpj(event);
        }

        if (mask === 'phone') {
            phone(event);
        }
    }, [mask]);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: "value",
        });
    }, [fieldName, registerField]);

    return (
        <>
            <div className="flex flex-row gap-1 items-center">
                <label
                    htmlFor={name}
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                    {label}
                </label>
                {
                    idTooltip && tooltipText && <Tooltip idElement={idTooltip} text={tooltipText} />
                }
            </div>
            <div className="flex">
                {mask === "currency" && (
                    <span
                        className={
                            `py-3 px-4 mb-2 font-medium text-gray-600 bg-gray-200
                        ${error ? 'border-red-500' : 'border-gray-400'}
                    `}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </span>
                )}
                <input
                    className={
                        `appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white
                    ${isFocused ? 'focus:border-blue-500' : ''}
                    ${isFilled ? 'focus:border-green-500' : ''}
                    ${error ? 'border-red-500' : ''}`}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onKeyUp={handleKeyUp}
                    defaultValue={defaultValue}
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    ref={inputRef}
                    {...rest}
                />

            </div>
            {error && (
                <p className="text-red-500 text-xs italic">{error}</p>
            )}
        </>
    );
};