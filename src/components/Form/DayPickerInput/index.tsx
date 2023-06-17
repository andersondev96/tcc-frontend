import { format, isSameDay, isValid, parse } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { ChangeEventHandler, useRef, useState } from "react";
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

    return (
        <div>
            <div ref={popperRef} className="absolute">
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
                    className="absolute py-3 px-4 mb-2 font-medium text-gray-600 bg-gray-100 border rounded-sm"
                />
                <button
                    ref={buttonRef}
                    type="button"
                    className="relative mt-3 ml-64 bg-white button-reset ba"
                    aria-label="Pick a date"
                    onClick={handleButtonClick}
                >
                    <span role="img" aria-label="calendar icon" className="text-xl">
                        📅
                    </span>
                </button>
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