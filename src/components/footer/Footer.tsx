import { Link } from 'react-router-dom';
import logo from '../../assets/logo-furia.svg';
import { Instagram, TwitterIcon } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-zinc-300 dark:border-zinc-950 shadow-md dark:bg-black text-zinc-950 dark:text-white py-10 ">
        <div className="max-w-5xl mx-auto px-4 space-y-8">
          <nav className="flex flex-wrap justify-center md:justify-start space-x-4">
            <Link to="/home" className="hover:underline dark:text-gray-300 dark:hover:text-white">Início</Link>
            <Link to="/fans" className="hover:underline dark:text-gray-300 dark:hover:text-white">Fans</Link>
            <Link to="/feed" className="hover:underline dark:text-gray-300 dark:hover:text-white">Feed</Link>
            <Link to="/eventos" className="hover:underline dark:text-gray-300 dark:hover:text-white">Eventos</Link>
            <Link to="/perfil" className="hover:underline dark:text-gray-300 dark:hover:text-white">Perfil</Link>
          </nav>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <img src={logo} alt="Logo" className="h-10 mb-2 dark:invert" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start justify-center">
              <h3 className="font-semibold mb-2">Créditos</h3>
              <p className="text-sm">
                Desenvolvido por{' '}
                <a
                  href="https://rudr1gu.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-500"
                >
                  Rudr1gu
                </a>
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start justify-center">
              <h3 className="font-semibold mb-2">Redes sociais</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/furiagg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline dark:text-gray-300 dark:hover:text-white"
                >
                  <Instagram />
                </a>
                <a
                  href="https://x.com/FURIA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline dark:text-gray-300 dark:hover:text-white"
                >
                  <TwitterIcon />
                </a>
              </div>
            </div>
  
          </div>
        </div>
      </footer>
    );
};

export default Footer;
