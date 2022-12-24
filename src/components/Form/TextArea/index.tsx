import { useField } from "@unform/core";
import { TextareaHTMLAttributes, useCallback, useEffect, useRef, useState } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    label: string;
    placeholder: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
    name,
    label,
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
            <label
                htmlFor={name}
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                {label}
            </label>
            <textarea
                id={name}
                name={name}
                defaultValue={defaultValue}
                ref={textAreaRef}
                placeholder={placeholder}
                onFocus={handleTextAreaFocus}
                onBlur={handleTextAreaBlur}
                className={
                    `appearance-none block w-full resize-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-6 mb:py-3 mb-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500
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
