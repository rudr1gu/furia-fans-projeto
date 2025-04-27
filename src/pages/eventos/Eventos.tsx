import React, { useContext, useState } from 'react';
import Evento from '../../models/Evento';
import EventosCard from '../../components/eventos/EventosCard';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import EventoService from '../../services/EventoService';

const Events: React.FC = () => {

    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);
    const [eventos, setEventos] = useState<Evento[]>([]);

    const token = usuario.token;

    const eventoService = new EventoService();
    const header = {
        headers: {
            Authorization: token,
        },
    };

    const buscarEventos = async () => {
        try {
            await eventoService.getAllEventos(setEventos, header);
        } catch (error) {
            console.error('Erro ao burcas eventos:', error);
        }
    }

    useEffect(() => {
        if (!token) {
            navigate('/login');
            handleLogout();
        } else {
            buscarEventos();
        }
    }, [token, navigate]);


    const events: Evento[] =  eventos

    const sortedEvents = [...events].sort((a, b) =>
        new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime()
    );

    return (
        <div className="bg-gray-100 dark:bg-zinc-950 min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <div className="relative rounded-xl overflow-hidden">
                        <img
                            src="https://images.pexels.com/photos/1293269/pexels-photo-1293269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt="Featured Event"
                            className="w-full h-64 md:h-80 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
                            <div className="p-6">
                                <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-medium mb-2 inline-block">
                                    Futuros Eventos
                                </span>
                                <h2 className="text-white text-2xl md:text-4xl font-bold mb-2">Panthers Summer Championship</h2>
                                <p className="text-white text-opacity-90 mb-4 max-w-2xl">
                                    Join us for our biggest tournament of the year with teams competing from all around the world!
                                </p>
                                <button className="bg-white text-black hover:bg-gray-200 px-6 py-2 rounded-md font-medium transition-colors duration-300">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedEvents.map(event => (
                        <EventosCard key={event.id} evento={event} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Events;