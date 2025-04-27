import React from 'react';
import Evento from '../../models/Evento';
import EventosCard from '../../components/eventos/EventosCard';
import Navbar from '../../components/navbar/Navbar';

const Events: React.FC = () => {
    const events: Evento[] = [
        {
            id: 1,
            titulo: 'Game Development Bootcamp',
            descricao: 'Dive into the world of game development with our intensive bootcamp. Learn about coding, design, and production pipelines!',
            imagemUrl: 'https://images.pexels.com/photos/907238/pexels-photo-907238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            dataInicio: '2025-05-05',
            localizacao: 'Tech Hub Conference Center',
            horaInicio: '10:00 AM - 5:00 PM',
            link: 'https://www.example.com/game-dev-bootcamp',
        },
        {
            id: 2,
            titulo: 'Indie Games Showcase',
            descricao: 'Come experience the best indie games developed by upcoming studios and passionate solo developers.',
            imagemUrl: 'https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            dataInicio: '2025-05-12',
            localizacao: 'Downtown Convention Center',
            horaInicio: '2:00 PM - 9:00 PM',
            link: 'https://www.example.com/indie-showcase',
        },
        {
            id: 3,
            titulo: 'Esports Workshop',
            descricao: 'Learn from the pros! Our players will teach you strategies, tips, and tricks to improve your gaming skills.',
            imagemUrl: 'https://images.pexels.com/photos/8132566/pexels-photo-8132566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            dataInicio: '2025-04-10',
            localizacao: 'Virtual Event',
            horaInicio: '9:00 AM - 12:00 PM',
            link: 'https://www.example.com/esports-workshop',
        },
        {
            id: 4,
            titulo: 'VR Experience Day',
            descricao: 'Step into new realities! Test out the latest VR technology and discover the future of immersive gaming.',
            imagemUrl: 'https://images.pexels.com/photos/775281/pexels-photo-775281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            dataInicio: '2025-06-01',
            localizacao: 'Innovation Park',
            horaInicio: '11:00 AM - 4:00 PM',
            link: 'https://www.example.com/vr-experience',
        },
        {
            id: 5,
            titulo: 'Streaming for Beginners',
            descricao: 'Want to start your own stream? Learn the basics of setting up your gear, building your brand, and engaging your audience!',
            imagemUrl: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            dataInicio: '2025-05-20',
            localizacao: 'Virtual Event',
            horaInicio: '3:00 PM - 6:00 PM',
            link: 'https://www.example.com/streaming-workshop',
        },
        {
            id: 6,
            titulo: 'Board Games Night',
            descricao: 'Unplug and unwind with an evening full of classic and new board games! Bring your friends!',
            imagemUrl: 'https://images.pexels.com/photos/846083/pexels-photo-846083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            dataInicio: '2025-04-30',
            localizacao: 'Community Center Hall',
            horaInicio: '6:00 PM - 11:00 PM',
            link: 'https://www.example.com/board-games-night',
        },
    ];

    const sortedEvents = [...events].sort((a, b) =>
        new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime()
    );

    return (
        <>
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
        </>
    );
};

export default Events;