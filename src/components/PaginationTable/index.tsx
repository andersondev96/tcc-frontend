
export const PaginationTable: React.FC = () => {
  return (
    <div className="mt-[1.625rem] flex flex-row items-center justify-between mobile:flex-col">

      <span className="font-montserrat font-light text-sm">
        Exibindo 5 resultados de 10
      </span>

      <div className="flex flex-row items-center mobile:mt-2">
        <a href="#" className="inline-flex items-center py-2 px-4 mr-3 font-montserrat text-sm font-light text-blue-200 bg-white rounded-lg border border-gray-300 mobile:px-2 mobile:text-xs hover:text-blue-400 transition-color duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Anterior
        </a>
        <a href="#" className="inline-flex items-center py-2 px-4 font-montserrat text-sm font-light text-blue-200 bg-white rounded-lg border border-gray-300 mobile:px-2 mobile:text-xs hover:text-blue-400 transition-color duration-300">
          Próximo
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

    </div>
  );
}