import React from 'react';
import { Twitter, Instagram, Twitch, Globe } from 'lucide-react';
import Usuario from '../../models/Usuario';


interface FanCardProps {
    fan: Usuario;
}

const FanCard: React.FC<FanCardProps> = ({ fan }) => {
    return (
        <div className="flex flex-col items-center justify-center py-5">
            <div className="relative bg-white dark:bg-zinc-900 shadow-lg rounded-lg border dark:border-zinc-900 w-80 pt-16 pb-5 px-6 text-center">
                <div className="absolute top-[-60px] left-1/2 transform -translate-x-1/2">
                    <img
                        className="w-[130px] h-[130px] rounded-full shadow-sm border-4 border-zinc-100 dark:border-zinc-900 transition-transform duration-300 hover:scale-95"
                        src={fan.avatar}
                        alt="Profile"
                    />
                </div>
                <h5 className="text-primary font-bold text-lg mt-3 dark:text-zinc-200">{fan.nickName}</h5>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-3">{fan.bio}</p>

                <div className="text-left mt-4">
                    <h6 className="text-primary font-semibold mb-2 dark:text-zinc-200">Jogos Favoritos:</h6>
                    <ul className="list-disc list-inside text-zinc-900 dark:text-zinc-300 text-sm">
                        {fan.jogos?.map((game) => (
                            <div key={game.id} className="flex items-center bg-zinc-100 dark:bg-zinc-950 rounded-full px-3 py-1 mb-1">
                                <img src={game.imagemUrl} alt={game.descricao} className="w-5 h-5 mr-2 rounded-full" />
                                <span className="text-sm text-zinc-800 dark:text-zinc-200">{game.descricao}</span>
                            </div>
                        ))}
                    </ul>
                </div>

               

                <div className="mt-4 flex justify-center space-x-4 bg-zinc-100 dark:bg-zinc-950 w-full p-2 rounded-lg shadow-sm">
                    { fan.redesSociais?.map((redesSocial) => (
                        <a
                            href={redesSocial.urlRedeSocial}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-600 dark:text-zinc-200 hover:text-primary transition-colors duration-300"
                        >
                            {redesSocial.nomeRedeSocial === 'twitter' && <Twitter size={20} />}
                            {redesSocial.nomeRedeSocial === 'instagram' && <Instagram size={20} />}
                            {redesSocial.nomeRedeSocial === 'twitch' && <Twitch size={20} />}
                            {redesSocial.nomeRedeSocial === 'website' && <Globe size={20} />}
                        </a>
                    ))}
                </div>      
            </div>
        </div>
    );
};

export default FanCard;