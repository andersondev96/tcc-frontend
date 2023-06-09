import { useField } from "@unform/core";
import { FormEvent, InputHTMLAttributes, useCallback, useEffect, useRef, useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "../../Tooltip";
import { cep, currency } from "./masks";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    type?: string;
    mask?: "cep" | "currency";
    prefix?: string;
    placeholder?: string;
    idTooltip?: string | undefined;
    tooltipText?: string;
}

export const Input: React.FC<InputProps> = ({
    name,
    label,
    type = "text",
    mask,
    prefix,
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
                {prefix && (
                    <span
                        className={
                            `py-3 px-4 mb-2 font-medium text-gray-600 bg-gray-100 border rounded-sm
                        ${error ? 'border-red-500' : 'border-gray-400'}
                    `}>
                        {prefix}
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