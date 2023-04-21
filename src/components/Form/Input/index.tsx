import { useField } from "@unform/core";
import { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "../../Tooltip";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    idTooltip?: string | undefined;
    tooltipText?: string;
}

export const Input: React.FC<InputProps> = ({
    name,
    label,
    type = "text",
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
                ref={inputRef}
                {...rest}
            />

            {error && (
                <p className="text-red-500 text-xs italic">{error}</p>
            )}
        </>
    );
};