import React from 'react';
// import { Twitter, Instagram, Twitch, Globe } from 'lucide-react';
import Usuario from '../../models/Usuario';


interface FanCardProps {
  fan: Usuario;
}

const FanCard: React.FC<FanCardProps> = ({ fan }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
      <div className="bg-gradient-to-r from-zinc-800 to-black p-4">
        <div className="flex items-center space-x-4">
          <img
            src={fan.avatar}
            alt={fan.nickName}
            className="w-16 h-16 rounded-full border-2 border-white object-cover"
          />
          <div>
            <h3 className="text-xl font-bold text-white">{fan.nickName}</h3>
            <div className="flex mt-2 space-x-2">
                <div>
                    <h1> rede sociais</h1>
                </div>
        
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-zinc-600 dark:text-zinc-300 mb-4">{fan.bio}</p>
        <div>
          <h4 className="font-semibold mb-2 text-zinc-800 dark:text-white">Favorite Games</h4>
          <div className="flex flex-wrap gap-2">
            {fan.jogos!.map((game) => (
              <div key={game.id} className="flex items-center bg-zinc-100 dark:bg-zinc-700 rounded-full px-3 py-1">
                <img src={game.imagemUrl} alt={game.descricao} className="w-5 h-5 mr-2 rounded-full" />
                <span className="text-sm text-zinc-800 dark:text-zinc-200">{game.descricao}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FanCard;