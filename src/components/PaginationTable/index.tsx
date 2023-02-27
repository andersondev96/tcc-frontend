interface PaginationTableProps {
    results: number;
}

export const PaginationTable: React.FC<PaginationTableProps> = ({ results }) => {
    return (
        <div className="mt-[1.625rem] flex flex-col sm:flex-row items-center justify-between">

            <span className="font-montserrat font-light text-sm">
                Exibindo {results} resultados.
            </span>

            <div className="flex flex-row items-center md:mt-2">
                <a href="#" className="inline-flex items-center py-2 px-2 sm:px-4 mr-3 font-montserrat text-xs sm:text-sm font-light text-blue-800 bg-white rounded-lg border border-gray-600 hover:text-blue-600 transition-color duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Anterior
                </a>
                <a href="#" className="inline-flex items-center py-2 px-2 sm:px-4 font-montserrat text-xs sm:text-sm font-light text-blue-800 bg-white rounded-lg border border-gray-600 hover:text-blue-600 transition-color duration-300">
                    Próximo
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            </div>

        </div>
    );
}