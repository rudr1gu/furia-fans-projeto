import EventosCard from '../../components/eventos/EventosCard';
import PostagemCard from '../../components/feed/PostagemCard';
import FanCard from '../../components/fans/FansCard';
import Usuario from '../../models/Usuario';
import Postagem from '../../models/Postagem';

import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import UsuarioService from '../../services/UsuarioService';
import PostagemService from '../../services/PostagemService';
import EventoService from '../../services/EventoService';
import Evento from '../../models/Evento';
import { useNavigate } from 'react-router-dom';
import SplashScreen from '../../components/ui/SplashScreen';

const Home = () => {
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario?.token;

    const [featuredFans, setFeaturedFans] = useState<Usuario[]>([]);

    const [featuredFan, setFeaturedFan] = useState<Usuario>({} as Usuario);

    const [recentPosts, setRecentPosts] = useState<Postagem[]>([]);
    const [recentPost, setRecentPost] = useState<Postagem>({} as Postagem);

    const [upcomingEvents, setUpcomingEvents] = useState<Evento[]>([]);
    const [upcomingEvent, setUpcomingEvent] = useState<Evento>({} as Evento);

    const [fan, setFan] = useState<Usuario>({} as Usuario);
    const [loading, setLoading] = useState<boolean>(false);

    const usuarioService = new UsuarioService();
    const postagemService = new PostagemService();
    const eventoService = new EventoService();

    const navigate = useNavigate();

    const header = {
        headers: { Authorization: token },
    };

    useEffect(() => {
        const carregarDados = async () => {
            if (!token) {
                handleLogout();
                navigate('/login');
                return;
            }
            setLoading(true);
            try {
                await Promise.all([
                    fetchFeaturedFans(),
                    fetchRecentPosts(),
                    fetchUpcomingEvents(),
                ]);
            } catch (error) {
                console.error('Error loading data:', error);
            }
            setLoading(false);
        }
        carregarDados();
    }, [token]);

    const fetchFeaturedFans = async () => {
        try {
            await usuarioService.getAllUsuarios((fans: Usuario[]) => {
                setFeaturedFans(fans);

                if (fans.length > 0) {
                    const lastFan = fans[fans.length - 1];
                    setFeaturedFan(lastFan);
                }
            }, header);
        } catch (error) {
            console.error('Error fetching featured fans:', error);
        }
    };

    const fetchRecentPosts = async () => {
        try {
            await postagemService.getAllPostagens((posts: Postagem[]) => {
                setRecentPosts(posts);
                if (posts.length > 0) {
                    const lastPost = posts[posts.length - 1];
                    setRecentPost(lastPost);
                }
            }, header);
        } catch (error) {
            console.error('Error fetching recent posts:', error);
        }
    };

    const fetchUpcomingEvents = async () => {
        try {
            await eventoService.getAllEventos((event: Evento[]) => {
                setUpcomingEvents(event);
                if (event.length > 0) {
                    const lastEvent = event[event.length - 1];
                    setUpcomingEvent(lastEvent);
                }
            }, header);
        } catch (error) {
            console.error('Error fetching upcoming events:', error);
        }
    };

    const deletePostagem = async (id: number) => {
        try {
            await postagemService.deletePostagem(id, header);
            setRecentPosts(prev => prev.filter(post => post.id !== id));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <section className="bg-gray-100 dark:bg-zinc-950 min-h-screen">
            {loading && <SplashScreen />}
            {!loading && (            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <section className="mb-10">
                    <div className="relative rounded-xl overflow-hidden mb-8">
                        <img
                            src="https://furiagg.fbitsstatic.net/img/b/1be4afd5-a727-4555-81fd-e779a32578be.jpg?w=1920&v=no-change"
                            alt="Furia E-Sports"
                            className="w-full h-64 md:h-96 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent flex items-end aling-items-center justify-center">
                            <div className="p-8">
                                <button className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-md font-bold transition-colors duration-300">
                                    Visite a nossa loja
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="space-y-4 p-4">
                                {featuredFan.id && <FanCard fan={featuredFan} />}
                                <div className="text-center mt-4">
                                    <a href="/fans" className="text-black dark:text-white hover:underline font-medium">
                                        Ver todos os fãs
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="space-y-4 p-4">
                                {recentPost.id && <PostagemCard postagem={recentPost} deletePostagem={deletePostagem} fan={fan} />}
                                <div className="text-center mt-4">
                                    <a href="/feed" className="text-black dark:text-white hover:underline font-medium">
                                        Ver o Feed
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="space-y-4 p-4">
                                {upcomingEvent.id && <EventosCard evento={upcomingEvent} />}
                                <div className="text-center mt-4">
                                    <a href="/eventos" className="text-black dark:text-white hover:underline font-medium">
                                        Ver todos os eventos
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            )}

        </section>
    );
};


export default Home;