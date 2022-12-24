import { SelectHTMLAttributes, useCallback, useEffect, useRef, useState } from "react";
import { useField } from "@unform/core";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    label: string;
    options: Array<{
        value: string;
        label: string;
    }>
}

export const Select: React.FC<SelectProps> = ({
    name,
    label,
    options,
    ...rest
}) => {
    const selectRef = useRef<HTMLSelectElement>(null);

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const { fieldName, defaultValue, error, registerField } = useField(name);

    const handleSelectFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleSelectBlur = useCallback(() => {
        setIsFocused(false);

        setIsFilled(!!selectRef.current?.value);
    }, []);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: selectRef.current,
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
            <div className="relative">
                <select
                    id={name}
                    name={name}
                    defaultValue={defaultValue}
                    ref={selectRef}
                    className={
                        `block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 mb-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500
                            ${isFocused ? 'focus:border-blue-500' : ''}
                            ${isFilled ? 'focus:border-green-500' : ''}
                            ${error ? 'border-red-500' : ''}
                        `
                    }
                    onFocus={handleSelectFocus}
                    onBlur={handleSelectBlur}
                    {...rest}
                >

                    {options.map(option => {
                        return <option key={option.value} value={option.value}>{option.label}</option>
                    })}

                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>
            {error && (
                <p className="text-red-500 text-xs italic">{error}</p>
            )}
        </>
    );
};