import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChatIcon, XIcon, MenuIcon } from '@heroicons/react/solid';
import Avatar from '../../assets/avatar.jpg';
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

interface NavBarProps {
    pageCurrent?: string;
}

export const NavBar: React.FC<NavBarProps> = ({ pageCurrent }) => {
    const { user, signOut } = useAuth();

    const navigate = useNavigate();

    const navigation = [
        { name: 'Home', href: '/', current: pageCurrent === 'home' },
        { name: 'Negócio', href: '/business', current: pageCurrent === 'negocio' },
        { name: 'Serviços', href: '/service', current: pageCurrent === 'servicos' },
        { name: 'Orçamentos', href: '/budget', current: pageCurrent === 'orcamentos' },
        { name: 'Chat', href: '#', current: pageCurrent === 'chat' }
    ]

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }


    return (
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
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    type="button"
                                    className="rounded full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="sr-only">Ver mensagens</span>
                                    <ChatIcon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                {user ? (
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="sr-only">Abrir menu do usuário</span>
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src={user.avatar || Avatar}
                                                    alt="Avatar"
                                                />
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
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Perfil
                                                        </a>
                                                    )}
                                                </Menu.Item>

                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Configurações
                                                        </a>
                                                    )}
                                                </Menu.Item>

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
    )
}