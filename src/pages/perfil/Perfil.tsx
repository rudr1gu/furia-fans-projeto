import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Twitter, Instagram, Twitch, Globe, X } from 'lucide-react';
import JogoService from '../../services/JogoService';
import UsuarioService from '../../services/UsuarioService';
import { AuthContext } from '../../context/AuthContext';
import Jogo from '../../models/Jogo';
import Usuario from '../../models/Usuario';
import ModalConfirmarSenha from './modal/ModalConfirmarSenha';
import SplashScreen from '../../components/ui/SplashScreen';
import ToastAlert from '../../utils/ToastAlert';


const Perfil = () => {
    const { usuario, handleLogout } = React.useContext(AuthContext);
    const token = usuario.token;
    const navigate = useNavigate();
    const jogoService = new JogoService();
    const usuarioService = new UsuarioService();

    const [jogos, setJogos] = useState<Jogo[]>([]);
    const [currentUser, setCurrentUser] = useState<Usuario>({} as Usuario);

    const [socialLinks, setSocialLinks] = useState({
        twitter: '',
        instagram: '',
        twitch: '',
        website: '',
    });
    const [favoriteGames, setFavoriteGames] = useState<Jogo[]>([]);
    const [gameToAdd, setGameToAdd] = useState('');

    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const [loading, setLoading] = useState<boolean>(false);

    const buscarJogos = async () => {
        try {
            const jogo = await jogoService.getAllJogos();
            setJogos(jogo);
        } catch (error) {
            console.error("Erro ao buscar jogos:", error);
        }
    };

    const buscarUsuarioById = async () => {
        try {
            await usuarioService.getByIdUsuario(usuario.id!, setCurrentUser, {
                headers: { Authorization: token },
            });
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            handleLogout();
        }
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
                    buscarUsuarioById(),
                    buscarJogos(),
                ]);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
            setLoading(false);
        }
        carregarDados();
    }, [token]);

    const availableGames: Jogo[] = jogos;

    const handleSocialChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        platform: keyof typeof socialLinks
    ) => {
        setSocialLinks({
            ...socialLinks,
            [platform]: e.target.value,
        });
    };

    const abrirModalSalvar = () => {
        setModalOpen(true);
    };

    const confirmarAlteracoes = async () => {
        const updatedUser = {
            id: currentUser.id,
            nickName: currentUser.nickName,
            bio: currentUser.bio,
            avatar: currentUser.avatar,
            email: currentUser.email,
            tipo: currentUser.tipo,
            senha: confirmarSenha,
            redesSociais: [
                {
                    nomeRedeSocial: 'twitter',
                    urlRedeSocial: socialLinks.twitter,
                    usuario: {
                        id: currentUser.id,
                    }
                },
                {
                    nomeRedeSocial: 'instagram',
                    urlRedeSocial: socialLinks.instagram,
                    usuario: {
                        id: currentUser.id,
                    }
                },
                {
                    nomeRedeSocial: 'twitch',
                    urlRedeSocial: socialLinks.twitch,
                    usuario: {
                        id: currentUser.id,
                    }
                },
                {
                    nomeRedeSocial: 'website',
                    urlRedeSocial: socialLinks.website,
                    usuario: {
                        id: currentUser.id,
                    }
                }
            ],
            jogos: favoriteGames,
        };

        try {
            await usuarioService.updateUsuario(updatedUser, setCurrentUser, {
                headers: { Authorization: token },
            });
            ToastAlert('Alterações salvas com sucesso!', 'sucesso');
            setModalOpen(false);
            setConfirmarSenha('');
        } catch (error) {
            console.error("Erro ao salvar alterações:", error);
            ToastAlert('Erro ao salvar alterações.', 'erro');
        }
    };

    return (
        <section className="bg-gray-100 dark:bg-zinc-950 min-h-screen">
            {loading && <SplashScreen />}
            {!loading && (
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white dark:bg-zinc-900 shadow-md rounded-lg overflow-hidden mb-8">
                        <div className="bg-black p-8 relative">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                                <div className="relative">
                                    <img
                                        src={currentUser.avatar}
                                        alt="Profile"
                                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white object-cover"
                                    />
                                    <button className="absolute bottom-0 right-0 bg-white text-black p-2 rounded-full hover:bg-zinc-200 transition-colors duration-300">
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <div className="text-center sm:text-left">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                                        <h2 className="text-2xl font-bold text-white">{currentUser.nickName}</h2>
                                        <button className="text-xs bg-white/20 px-2 py-1 rounded text-white hover:bg-white/30 transition-colors duration-300">
                                            Editar
                                        </button>
                                    </div>
                                    <div className="flex justify-center sm:justify-start space-x-3">
                                        <Twitter size={20} className="text-white hover:text-blue-400 transition-colors" />
                                        <Instagram size={20} className="text-white hover:text-pink-500 transition-colors" />
                                        <Twitch size={20} className="text-white hover:text-purple-500 transition-colors" />
                                        <Globe size={20} className="text-white hover:text-zinc-300 transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Nick Name
                                </label>
                                <input
                                    type="text"
                                    value={currentUser.nickName}
                                    onChange={(e) => setCurrentUser({ ...currentUser, nickName: e.target.value })}
                                    className="w-full p-3 border border-black dark:border-zinc-800 focus:ring-2 focus:ring-black dark:focus:ring-zinc-700 dark:bg-zinc-900 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Bio
                                </label>
                                <textarea
                                    value={currentUser.bio}
                                    onChange={(e) => setCurrentUser({ ...currentUser, bio: e.target.value })}
                                    rows={2}
                                    className="w-full p-3 border border-black dark:border-zinc-800 focus:ring-2 focus:ring-black dark:focus:ring-zinc-700 dark:bg-zinc-900 dark:text-white resize-none"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-zinc-900 dark:text-white">
                                    Links Redes Sociais
                                </h3>
                                <div className="space-y-4">
                                    {['twitter', 'instagram', 'twitch', 'website'].map((platform) => (
                                        <div className="flex items-center gap-3" key={platform}>
                                            <input
                                                type="text"
                                                placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
                                                value={socialLinks[platform as keyof typeof socialLinks]}
                                                onChange={(e) => handleSocialChange(e, platform as keyof typeof socialLinks)}
                                                className="flex-1 p-2 border border-black dark:border-zinc-800 focus:ring-2 focus:ring-black dark:focus:ring-zinc-700 dark:bg-zinc-900 dark:text-white"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-zinc-900 dark:text-white">
                                    Jogos Favoritos
                                </h3>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {favoriteGames.map((game) => (
                                        <div key={game.id} className="flex items-center bg-zinc-100 dark:bg-zinc-950 rounded-full px-3 py-1">
                                            <img src={game.imagemUrl} alt={game.descricao} className="w-5 h-5 mr-2 rounded-full" />
                                            <span className="text-sm text-zinc-900 dark:text-zinc-200">{game.descricao}</span>
                                            <button
                                                onClick={() => setFavoriteGames(favoriteGames.filter((g) => g.id !== game.id))}
                                                className="ml-2 text-zinc-600 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <select
                                        value={gameToAdd}
                                        onChange={(e) => setGameToAdd(e.target.value)}
                                        className="flex-1 p-2 border border-black dark:border-zinc-800 focus:ring-2 focus:ring-black dark:focus:ring-zinc-700 dark:bg-zinc-900 dark:text-white"
                                    >
                                        <option value="">Selecione seu jogo favorito...</option>
                                        {availableGames.map((game) => (
                                            <option key={game.id} value={game.id}>{game.descricao}</option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={() => {
                                            const selectedGame = availableGames.find(g => g.id === Number(gameToAdd) && !favoriteGames.some(fg => fg.id === g.id));
                                            if (selectedGame) setFavoriteGames([...favoriteGames, selectedGame]);
                                        }}
                                        disabled={!gameToAdd}
                                        className="bg-black text-white px-4 py-2 rounded hover:bg-zinc-900 disabled:opacity-50"
                                    >
                                        Adicionar
                                    </button>
                                </div>
                            </div>
                            <div className="text-right">
                                <button
                                    onClick={abrirModalSalvar}
                                    className="bg-black text-white px-6 py-2 rounded hover:bg-zinc-900 transition-colors"
                                >
                                    Salvar Alterações
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {
                modalOpen && (
                    <ModalConfirmarSenha confirmarAlteracoes={confirmarAlteracoes} confirmarSenha={confirmarSenha} setConfirmarSenha={setConfirmarSenha} setModalOpen={setModalOpen} />)
            }
        </section>
    );
};

export default Perfil;
