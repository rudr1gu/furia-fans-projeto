import React, { useContext, useState } from 'react';
import Evento from '../../models/Evento';
import EventosCard from '../../components/eventos/EventosCard';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import EventoService from '../../services/EventoService';
import SplashScreen from '../../components/ui/SplashScreen';

const Events: React.FC = () => {

    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

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
        const carregarDados = async () => {
            if (!token) {
                handleLogout();
                navigate("/login");
                return;
            }
            setLoading(true);
            try {
                await buscarEventos();
            } catch (error) {
                console.error('Erro ao carregar eventos:', error);
            }
            setLoading(false);
        };
        carregarDados();
    }, [token, navigate]);


    const events: Evento[] = eventos

    const sortedEvents = [...events].sort((a, b) =>
        new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime()
    );

    return (
        <section className="bg-gray-100 dark:bg-zinc-950 min-h-screen">
            {loading && <SplashScreen />}
            {!loading && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <div className="relative rounded-xl overflow-hidden">
                            <img
                                src="https://preview.redd.it/5n24r06ovr581.png?auto=webp&s=5fa64ce7a5b6b08214fe3ca2db6f767fd191992c"
                                alt="Featured Event"
                                className="w-full h-64 md:h-80 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
                                <div className="p-6">
                                    <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-medium mb-2 inline-block">
                                        Futuros Eventos
                                    </span>
                                    <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">
                                        Participe dos nossos eventos
                                    </h2>
                                    <p className="text-gray-300 mb-4">
                                        Venha fazer parte da nossa comunidade e aproveite os eventos que preparamos para você.
                                    </p>
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
            )}
        </section>
    );
};

export default Events;