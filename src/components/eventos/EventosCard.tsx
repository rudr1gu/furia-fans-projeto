import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import Evento from '../../models/Evento';

interface EventosCardProps {
    evento: Evento
}

const EventosCard: React.FC<EventosCardProps> = ({ evento }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
      <div className="h-48 overflow-hidden">
        <img 
          src={evento.imagemUrl} 
          alt={evento.titulo} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{evento.titulo}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{evento.descricao}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Calendar size={18} className="mr-2" />
            <span>{evento.dataInicio}</span>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Clock size={18} className="mr-2" />
            <span>{evento.horaInicio}</span>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <MapPin size={18} className="mr-2" />
            <span>{evento.localizacao}</span>
          </div>
        </div>
        
        <a className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-300" href={evento.link} target="_blank" rel="noopener noreferrer">
          Saber mais
        </a>
      </div>
    </div>
  );
};

export default EventosCard;