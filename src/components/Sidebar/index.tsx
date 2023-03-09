import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Avatar from '../../assets/avatar.jpg';
import api from "../../services/api";

interface SideBarProps {
    pageActive?: string;
}

export const SideBar: React.FC<SideBarProps> = ({ pageActive }) => {

    const { user, signOut } = useAuth();
    const [company, setCompany] = useState([]);

    useEffect(() => {
        async function loadCompany() {
            const response = await api.get('/companies');

            setCompany(response.data);
        }

        loadCompany();
    }, []);

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className={`mx-auto max-w-7xl ${company.length === 0 ? 'hidden' : 'block'}`}>
            <div className="w-12 sm:w-60 h-full bg-gray-800 shadow-md fixed ">
                <div className="flex flex-col flex-1 items-center mt-8 justify-center sm:items-stretch sm:justify-start">
                    <div className="hidden sm:flex ml-6 flex-shrink-0 items-center">
                        <Link to="/admin" className="block h-8 w-auto lg:block font-cursive font-medium text-xl text-gray-200">
                            Start Business
                        </Link>
                    </div>

                    <div className="mt-6 sm:block sm:ml-6 items-center">
                        <Link to="/profile">
                            <div className="flex items-center">
                                {user.avatar ? (
                                    <div className="shrink-0">
                                        <img src={`http://localhost:3333/avatar/${user.avatar}`} alt="Avatar" className="rounded-full h-8 sm:h-10 w-8 sm:w-10" />
                                    </div>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#9ca3af" className="w-8 h-8">
                                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                    </svg>


                                )}
                                <div className="hidden sm:block glow ml-3">
                                    <p className="text-sm font-semibold text-white">{user.name}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={classNames(pageActive === 'empresa' ? 'bg-blue-900' : '', 'mt-6 hover:bg-blue-800 transition duration-300')}>
                        <div className="flex space-x-4 sm:ml-6">
                            <Link to="/admin/business" className="flex flex-row text-white px-3 py-2 rounded-md font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                                </svg>

                                <span className="hidden sm:block ml-4">Empresa</span>
                            </Link>
                        </div>
                    </div>

                    <div className={classNames(pageActive === 'servicos' ? 'bg-blue-900' : '', 'mt-6 hover:bg-blue-800 transition duration-300')}>
                        <div className="flex space-x-4 sm:ml-6">
                            <Link to="/admin/services" className="flex flex-row text-white px-3 py-2 rounded-md font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                                </svg>

                                <span className="ml-4 hidden sm:block">Serviços</span>
                            </Link>
                        </div>
                    </div>

                    <div className={classNames(pageActive === 'clientes' ? 'bg-blue-900' : '', 'mt-6 hover:bg-blue-800 transition duration-300')}>
                        <div className="flex space-x-4 sm:ml-6">
                            <Link to="/admin/clients" className="flex flex-row text-white px-3 py-2 rounded-md font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>

                                <span className="ml-4 hidden sm:block">Clientes</span>
                            </Link>
                        </div>
                    </div>

                    <div className={classNames(pageActive === 'orcamentos' ? 'bg-blue-900' : '', 'mt-6 hover:bg-blue-800 transition duration-300')}>
                        <div className="flex space-x-4 sm:ml-6">
                            <Link to="/admin/budget" className="flex flex-row text-white px-3 py-2 rounded-md font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                                </svg>

                                <span className="ml-4 hidden sm:block">Orçamentos</span>
                            </Link>
                        </div>
                    </div>

                    <div className={classNames(pageActive === 'chat' ? 'bg-blue-900' : '', 'mt-6 hover:bg-blue-800 transition duration-300')}>
                        <div className="flex space-x-4 sm:ml-6">
                            <Link to="/admin/chat" className="flex flex-row text-white px-3 py-2 rounded-md font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                </svg>

                                <span className="ml-4 hidden sm:block">Chat</span>
                            </Link>
                        </div>
                    </div>

                    <div className={classNames(pageActive === 'configuracoes' ? 'bg-blue-900' : '', 'mt-6 hover:bg-blue-800 transition duration-300')}>
                        <div className="flex space-x-4 sm:ml-6">
                            <Link to="/admin/settings" className="flex flex-row text-white px-3 py-2 rounded-md font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                                </svg>

                                <span className="ml-4 hidden sm:block">Configurações</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="text-center bottom-0 absolute w-full">
                    <hr className="m-0" />
                    <div className="flex space-x-4 sm:ml-6">
                        <button onClick={signOut} className="flex flex-row flex-center text-white px-3 py-2 rounded-md font-medium hover:text-gray-300 transition duration-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>

                            <span className="ml-4 hidden sm:block">Sair</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
