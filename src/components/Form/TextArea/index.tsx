import { useField } from "@unform/core";
import { TextareaHTMLAttributes, useCallback, useEffect, useRef, useState } from "react";
import { Tooltip } from "../../Tooltip";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    label: string;
    idTooltip?: string | undefined;
    tooltipText?: string;
    placeholder: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
    name,
    label,
    idTooltip = undefined,
    tooltipText,
    placeholder,
    ...rest
}) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const { fieldName, defaultValue, error, registerField } = useField(name);

    const handleTextAreaFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleTextAreaBlur = useCallback(() => {
        setIsFocused(false);

        setIsFilled(!!textAreaRef.current?.value);
    }, []);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: textAreaRef.current,
            path: "value",
        });
    }, [fieldName, registerField]);

    return (
        <>
            <div className="flex flex-row gap-1 items-center">
                <label
                    htmlFor={name}
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    {label}
                </label>
                {idTooltip && tooltipText && <Tooltip idElement={idTooltip} text={tooltipText} />}
            </div>

            <textarea
                id={name}
                name={name}
                defaultValue={defaultValue}
                ref={textAreaRef}
                placeholder={placeholder}
                onFocus={handleTextAreaFocus}
                onBlur={handleTextAreaBlur}
                className={
                    `appearance-none block w-full resize-none bg-gray-200 text-gray-700 border rounded py-6 mb:py-3 mb-2 px-4 leading-tight focus:outline-none focus:bg-white
                    ${isFocused ? 'focus:border-blue-500' : ''}
                    ${isFilled ? 'focus:border-green-500' : ''}
                    ${error ? 'border-red-500' : ''}`}
                {...rest}
            />

            {error && (
                <p className="text-red-500 text-xs italic">{error}</p>
            )}
        </>
    );
};
