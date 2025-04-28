import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-zinc-800 dark:bg-zinc-900 text-white py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <h2 className="text-lg font-bold">Furia</h2>
                    <p className="text-sm text-gray-400">© {new Date().getFullYear()} All rights reserved.</p>
                </div>

                <div className="flex space-x-6">
                    <Link to="/feed" className="text-gray-300 hover:text-white transition-colors">Feed</Link>
                    <Link to="/fans" className="text-gray-300 hover:text-white transition-colors">Fans</Link>
                    <Link to="/eventos" className="text-gray-300 hover:text-white transition-colors">Eventos</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
