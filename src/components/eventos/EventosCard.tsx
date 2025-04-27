import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import Evento from '../../models/Evento';

interface EventosCardProps {
    evento: Evento
}

const EventosCard: React.FC<EventosCardProps> = ({ evento }) => {


  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
      <div className="h-48 overflow-hidden">
        <img 
          src={evento.imagemUrl} 
          alt={evento.titulo} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{evento.titulo}</h3>
        <p className="text-zinc-600 dark:text-zinc-300 mb-4 line-clamp-2">{evento.descricao}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-zinc-900 dark:text-zinc-300">
            <Calendar size={18} className="mr-2" />
            <span>{evento.dataInicio}</span>
          </div>
          <div className="flex items-center text-zinc-900 dark:text-zinc-300">
            <Clock size={18} className="mr-2" />
            <span>{evento.horaInicio}</span>
          </div>
          <div className="flex items-center text-zinc-900 dark:text-zinc-300">
            <MapPin size={18} className="mr-2" />
            <span>{evento.localizacao}</span>
          </div>
        </div>
        
        <button className="mt-4 w-full bg-black text-white py-2 hover:bg-zinc-950 transition-colors duration-300" rel="noopener noreferrer">
          Saber mais
        </button>
      </div>
    </div>
  );
};

export default EventosCard;