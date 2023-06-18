import { format, isSameDay, isValid, parse } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { usePopper } from "react-popper";

interface DayPickerInputProps {
    name: string;
    label: string;
    selectedDate: Date;
    dateValue: string;
    setDateValue: React.Dispatch<React.SetStateAction<string>>;
}

export const DayPickerInput: React.FC<DayPickerInputProps> = ({ name, label, selectedDate, dateValue, setDateValue }) => {
    const [selected, setSelected] = useState<Date>();
    const [isPopperOpen, setIsPopperOpen] = useState(false);

    const popperRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

    const popper = usePopper(popperRef.current, popperElement, {
        placement: 'bottom-start'
    });

    const closePopper = () => {
        setIsPopperOpen(false);
        buttonRef?.current?.focus();
    }

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        e.currentTarget.maxLength = 10;
        const rawValue = e.target.value;
        const maskedValue = rawValue
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{2})(\d)/, "$1/$2");

        setDateValue(maskedValue);

        const date = parse(e.currentTarget.value, 'yyyy-MM-dd', new Date());
        if (isValid(date)) {
            setSelected(date);
        } else {
            setSelected(undefined);
        }
    };

    const handleButtonClick = () => {
        setIsPopperOpen(!isPopperOpen);
    }

    const handleDaySelect = (date: Date | undefined) => {
        setSelected(date);
        if (date) {
            setDateValue(format(date, 'dd/MM/yyyy', { locale: ptBR }));
            closePopper();
        } else {
            setDateValue('');
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (popperElement && !popperElement.contains(event.target as Node)) {
                closePopper();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [popperElement]);

    return (
        <div>
            <div
                ref={popperRef}
                className="absolute"
                onClick={handleButtonClick}
            >
                <label
                    htmlFor={name}
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                    {label}
                </label>
                <input
                    type="text"
                    placeholder={format(new Date(), 'dd/MM/yyyy', { locale: ptBR })}
                    value={dateValue}
                    onChange={handleInputChange}
                    className="absolute py-3 px-4 mb-2 font-medium text-gray-600 bg-gray-200 border rounded-sm"
                />
                <div
                    className="relative mt-5 ml-64 button-reset ba"
                    aria-label="Pick a date"
                >
                    <span role="img" aria-label="calendar icon" className="text-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                    </span>
                </div>
            </div>
            {isPopperOpen && (
                <div
                    tabIndex={-1}
                    style={popper.styles.popper}
                    className="dialog-sheet bg-white border border-gray-400 rounded opacity-90"
                    {...popper.attributes.popper}
                    ref={setPopperElement}
                    role="dialog"
                    aria-label="DayPicker calendar"
                >
                    <DayPicker
                        initialFocus={isPopperOpen}
                        mode="single"
                        defaultMonth={selected}
                        selected={selectedDate}
                        onSelect={handleDaySelect}
                        locale={ptBR}
                        modifiers={{
                            selected: (date) => {
                                return selected !== undefined && isSameDay(date, selected);
                            },
                        }}
                        modifiersStyles={{
                            selected: {
                                backgroundColor: '#4655E0',
                            }
                        }}
                    />
                </div>
            )}

        </div>
    )
}