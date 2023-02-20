import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChatIcon, MenuIcon, XIcon } from '@heroicons/react/solid';
import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";
import { ModalChat } from "../ModalChat";
import { ModalContainer } from "../ModalContainer";

interface NavBarProps {
    pageCurrent?: string;
}

export const NavBar: React.FC<NavBarProps> = ({ pageCurrent }) => {
    const { user, signOut } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const company_id = localStorage.getItem('@web:company_id');

    useEffect(() => {
        handleToAdmPage();
    }, [handleToAdmPage]);

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    async function handleToAdmPage() {
        api.get('/users/entrepreneur').then(response => {
            if (response.data === null) {
                setIsAdmin(false)
            } else {
                setIsAdmin(true);
            }

        });

    }

    const navigate = useNavigate();

    const navigation = [
        { name: 'Home', href: '/', current: pageCurrent === 'home' },
        { name: 'Negócio', href: `/business/${company_id}`, current: pageCurrent === 'negocio' },
        { name: 'Serviços', href: `/services/${company_id}`, current: pageCurrent === 'servicos' },
        { name: 'Orçamentos', href: '/budget', current: pageCurrent === 'orcamentos' }
    ]

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div>
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">Abrir menu principal</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex flex-shrink-0 items-center">
                                        <span className="block h-8 w-auto lg:block font-cursive font-medium text-2xl text-gray-200">
                                            Start Business
                                        </span>
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block">
                                        {user && company_id ? (
                                            <div className="flex space-x-4">
                                                {navigation.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        to={item.href}
                                                        className={classNames(
                                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                            'px-3 py-2 rounded-md text-sm font-medium'
                                                        )}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex space-x-4">
                                                <Link
                                                    to="/"
                                                    className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"

                                                >
                                                    Home
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    {user ? (
                                        <button
                                            onClick={openModal}
                                            type="button"
                                            className="rounded full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <span className="sr-only">Ver mensagens</span>
                                            <ChatIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    ) : ''}

                                    {user ? (
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-5 focus:transition-shadow focus:duration-200 focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="sr-only">Abrir menu do usuário</span>

                                                    <div className="flex items-center">
                                                        {user.avatar ? (
                                                            <div className="shrink-0">
                                                                <img src={`http://localhost:3333/avatar/${user.avatar}`} alt="Avatar" className="rounded-full h-8 sm:h-10 w-8 sm:w-10" />
                                                            </div>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#9ca3af" className="rounded-full h-8 sm:h-10 w-8 sm:w-10">
                                                                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                                            </svg>


                                                        )}
                                                    </div>
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-40 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <div className="border-b border-gray-400 border-opacity-40">
                                                        <span
                                                            className='block px-4 py-2 font-medium text-sm text-gray-700'
                                                        >
                                                            {user.name}
                                                        </span>

                                                    </div>

                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                to="/profile"
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Perfil
                                                            </Link>
                                                        )}
                                                    </Menu.Item>

                                                    {isAdmin && (
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    to="/admin/business"
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                >
                                                                    Área administrativa
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                    )}


                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <span
                                                                onClick={signOut}
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                                                            >
                                                                Sair
                                                            </span>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>

                                            </Transition>
                                        </Menu>
                                    ) : (
                                        <div className="relative ml-3">
                                            <button
                                                onClick={() => navigate('/login')}
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-full">
                                                Login
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pt-2 pb:3">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block px-3 py-2 rounded-md text-base font-medium'
                                        )}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
            <ModalContainer
                title="Singhtglass Coffee"
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >
                <ModalChat />
            </ModalContainer>
        </div>
    )
}