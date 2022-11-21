interface InputProps {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
}

export const Input: React.FC<InputProps> = ({ name, label, type = "text", placeholder }) => {
  return (
    <div className="flex flex-col gap-1 w-80">
      <label
        htmlFor={name}
        className="font-inter font-semibold text-sm text-indigo-600"
      >
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="h-10 border-2 border-black rounded px-6 outline-0 focus:border-indigo-600 font-montserrat font-light text-[0.938rem]"
      />
    </div>
  )
}