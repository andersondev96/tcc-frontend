import { AiOutlineSearch } from "react-icons/ai"

export const Search: React.FC = () => {
  return (
    <div className="flex flex-row">
      <input
        className="border-none bg-gray-300 font-inter rounded-l font-light text-xl px-8 py-4 w-[20rem] h-[3rem] mobile:w-[12rem] mobile:h-[2.5rem] mobile:text-sm"
        type="text"
        placeholder="Pesquisar"
      />
      <button className="h-[3rem] w-[3rem] bg-gray-300 flex flex-row items-center justify-center rounded-r border-l border-black hover:opacity-80 transition-opacity mobile:w-[2.5rem] mobile:h-[2.5rem]">
        <AiOutlineSearch size={24} color="#393737" />
      </button>
    </div>
  )
}