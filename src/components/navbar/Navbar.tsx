import React, { useState, useContext } from 'react';
import { Menu, X, Users, MessageSquare, Calendar, User, Home, Sun, Moon } from 'lucide-react'; // Importando ícones de sol e lua
import { NavLink } from '../ui/NavLink';
import Logo from '../ui/Logo';
import { ThemeContext } from '../../context/ThemeContext';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error("ThemeContext must be used within a ThemeProvider");
    }

    const { toggleTheme } = themeContext;

    return (
        <nav className="bg-white text-black dark:bg-black dark:text-white sticky top-0 z-50 shadow-md transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Logo size={40} />
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-center justify-between space-x-4">
                                <NavLink href="/" icon={<Home size={18} />}>
                                    Inicio
                                </NavLink>
                                <NavLink href="/fans" icon={<Users size={18} />}>
                                    Fans
                                </NavLink>
                                <NavLink href="/feed" icon={<MessageSquare size={18} />}>
                                    Feed
                                </NavLink>
                                <NavLink href="/events" icon={<Calendar size={18} />}>
                                    Eventos
                                </NavLink>
                                <NavLink href="/profile" icon={<User size={18} />}>
                                    Perfil
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            {themeContext.theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-300 px-4 py-2 rounded font-medium transition-colors duration-300">
                            Sair
                        </button>
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-black dark:text-white hover:text-white hover:bg-gray-800 focus:outline-none"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-100 dark:bg-gray-900">
                        <NavLink
                            href="/"
                            icon={<Home size={18} />}
                            className="block px-3 py-2 rounded-md text-base font-medium"
                            activeClassName="bg-gray-300 dark:bg-gray-800"
                        >
                            Inicio
                        </NavLink>
                        <NavLink
                            href="/fans"
                            icon={<Users size={18} />}
                            className="block px-3 py-2 rounded-md text-base font-medium"
                            activeClassName="bg-gray-300 dark:bg-gray-800"
                        >
                            Fans
                        </NavLink>
                        <NavLink
                            href="/feed"
                            icon={<MessageSquare size={18} />}
                            className="block px-3 py-2 rounded-md text-base font-medium"
                            activeClassName="bg-gray-300 dark:bg-gray-800"
                        >
                            Feed
                        </NavLink>
                        <NavLink
                            href="/events"
                            icon={<Calendar size={18} />}
                            className="block px-3 py-2 rounded-md text-base font-medium"
                            activeClassName="bg-gray-300 dark:bg-gray-800"
                        >
                            Eventos
                        </NavLink>
                        <NavLink
                            href="/profile"
                            icon={<User size={18} />}
                            className="block px-3 py-2 rounded-md text-base font-medium"
                            activeClassName="bg-gray-300 dark:bg-gray-800"
                        >
                            Perfil
                        </NavLink>
                        <div className="flex flex-col gap-2 mt-4 px-3">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors self-start"
                            >
                                {themeContext.theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                            <button className="w-full bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-300 px-4 py-2 rounded font-medium transition-colors duration-300">
                                Sair
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
