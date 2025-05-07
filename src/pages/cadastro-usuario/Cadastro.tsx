import { useNavigate } from "react-router-dom";
import UsuarioService from "../../services/UsuarioService";
import { ChangeEvent, useEffect, useState } from "react";
import Usuario from "../../models/Usuario";
import Jogo from "../../models/Jogo";
import JogoService from "../../services/JogoService";
import avatares from "./avatares/avatares";
import logo from "../../assets/furia.png";
import ToastAlert from "../../utils/ToastAlert";
import Spinner from "../../components/ui/Spinner";
import SplashScreen from "../../components/ui/SplashScreen";

const Cadastro = () => {
    const usuarioService = new UsuarioService();
    const jogoService = new JogoService();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [confirmarSenha, setConfirmarSenha] = useState<string>("");
    const [usuario, setUsuario] = useState<Usuario>({
        nickName: "",
        email: "",
        senha: "",
        tipo: "usuario",
        avatar: "https://static-cdn.jtvnw.net/jtv_user_pictures/27cebe1b-e7e5-46ad-a737-04d5a01684a9-profile_image-300x300.png",
        bio: "",
        redesSociais: [],
        jogos: [],
        nivel: { id: 1 },
    });

    const [jogosDisponiveis, setJogosDisponiveis] = useState<Jogo[]>([]);
    const [jogosSelecionados, setJogosSelecionados] = useState<Jogo[]>([]);
    const [avatarSelecionado, setAvatarSelecionado] = useState<string>("string.png");

    const retornar = () => navigate("/login");

    const atualizarEstado = (e: ChangeEvent<HTMLInputElement>) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    };

    const handleConfirmarSenha = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmarSenha(e.target.value);
    };

    const handleSelecionarJogo = (jogo: Jogo) => {
        if (jogosSelecionados.includes(jogo)) {
            setJogosSelecionados(jogosSelecionados.filter((j) => j !== jogo));
        } else {
            setJogosSelecionados([...jogosSelecionados, jogo]);
        }
    };

    const handleSelecionarAvatar = (avatar: string) => {
        setAvatarSelecionado(avatar);
        setUsuario({ ...usuario, avatar });
    };

    const cadastrar = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (confirmarSenha === usuario.senha && confirmarSenha.length >= 8) {
            setIsLoading(true);

            const usuarioParaCadastrar = {
                ...usuario,
                jogos: jogosSelecionados,
                avatar: avatarSelecionado,
            };

            try {
                await usuarioService.createUsuario(usuarioParaCadastrar, setUsuario);
                ToastAlert("Usuário cadastrado com sucesso!", "sucesso");
                retornar();
            } catch (error) {
                console.error("Erro ao cadastrar usuário:", error);
                ToastAlert("Erro ao cadastrar usuário!", "erro");
            }
        } else {
            ToastAlert("As senhas não conferem ou são menores que 8 caracteres!", "erro");
            setUsuario({ ...usuario, senha: '' });
            setConfirmarSenha('');
        }

        setIsLoading(false);
    };

    useEffect(() => {
        const buscarJogos = async () => {
            try {
                const jogos = await jogoService.getAllJogos();
                setJogosDisponiveis(jogos);
            } catch (error) {
                console.error("Erro ao buscar jogos:", error);
            }
        };
        buscarJogos();

        const carregarDados = async () => {
            setLoading(true);
            try {
                await buscarJogos();
            } catch (err) {
                console.error("Erro ao carregar dados:", err);
            }
            setLoading(false);
        };
        carregarDados();
    }, []);

  const disabledButtonSubmit = () => {
    if (usuario.nickName.length < 5 || usuario.email.length === 0 || usuario.senha.length < 8) {
        return true;
    }
    if (confirmarSenha.length === 0 || confirmarSenha !== usuario.senha) {
        return true;
    }
    if (jogosSelecionados.length === 0) {
        return true;
    }
    return false;
    }

    return (
        <section className="min-h-screen flex flex-col justify-center items-center bg-zinc-200 dark:bg-zinc-900 transition-colors">
            {loading && <SplashScreen />}

            {!loading && (
            <form onSubmit={cadastrar} className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white dark:bg-zinc-950 transition-colors">
                <div className="flex justify-center mb-1">
                    <img src={logo} alt="Logo" className="w-20 h-20" />
                </div>
                <h2 className="text-3xl font-bold mb-6 text-center text-black dark:text-white">Cadastre-se</h2>

                <div className="mb-4">
                    <label className="block text-sm text-black dark:text-white mb-1">NickName</label>
                    <input
                        id="nickName"
                        type="text"
                        name="nickName"
                        placeholder="Nickname"
                        className="w-full px-3 py-2 border border-black dark:border-white bg-transparent text-black dark:text-white focus:outline-none"
                        value={usuario.nickName}
                        onChange={atualizarEstado}
                        minLength={5}
                        maxLength={20}
                        required
                    />
                    {
                        usuario.nickName.length > 0 && usuario.nickName.length < 5 && (
                            <p className="text-sm text-red-500">O Nickname deve ter pelo menos 5 caracteres!</p>
                        )
                    }
                </div>

                <div className="mb-4">
                    <label className="block text-sm text-black dark:text-white mb-1">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="seunome@email.com"
                        className="w-full px-3 py-2 border border-black dark:border-white bg-transparent text-black dark:text-white focus:outline-none"
                        value={usuario.email}
                        onChange={atualizarEstado}
                        required
                    />
                    {
                        usuario.email.length > 0 && !usuario.email.includes("@") && (
                            <p className="text-sm text-red-500">Email inválido!</p>
                        )
                    }
                </div>

                <div className="mb-4">
                    <label className="block text-sm text-black dark:text-white mb-1">Senha</label>
                    <input
                        id="senha"
                        type="password"
                        name="senha"
                        placeholder="*********"
                        className="w-full px-3 py-2 border border-black dark:border-white bg-transparent text-black dark:text-white focus:outline-none"
                        value={usuario.senha}
                        onChange={atualizarEstado}
                        required
                    />
                    {confirmarSenha.length > 0 && (
                        <p className={`text-sm ${confirmarSenha === usuario.senha ? 'text-green-500' : 'text-red-500'}`}>
                            {confirmarSenha === usuario.senha ? 'As senhas conferem!' : 'As senhas não conferem!'}
                        </p>
                    )}
                    {
                        usuario.senha.length > 0 && usuario.senha.length < 8 && (
                            <p className="text-sm text-red-500">A senha deve ter pelo menos 8 caracteres!</p>
                        )
                    }
                </div>

                <div className="mb-4">
                    <label className="block text-sm text-black dark:text-white mb-1">Confirmar Senha</label>
                    <input
                        id="confirmarSenha"
                        type="password"
                        name="confirmarSenha"
                        placeholder="*********"
                        className="w-full px-3 py-2 border border-black dark:border-white bg-transparent text-black dark:text-white focus:outline-none"
                        value={confirmarSenha}
                        onChange={handleConfirmarSenha}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm text-black dark:text-white mb-2">Escolha seu Avatar</label>
                    <div className="flex gap-4 flex-wrap">
                        {avatares.map((avatar) => (
                            <img
                                key={avatar}
                                src={avatar}
                                alt="Avatar"
                                onClick={() => handleSelecionarAvatar(avatar)}
                                className={`w-16 h-16 rounded-full object-cover cursor-pointer border-2 ${avatarSelecionado === avatar ? 'border-amber-600' : 'border-black dark:border-white'}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm text-black dark:text-white mb-2">Jogos Favoritos</label>
                    <div className="flex gap-4 flex-wrap">
                        {jogosDisponiveis.map(jogo => (
                            <div
                                key={jogo.id}
                                onClick={() => handleSelecionarJogo(jogo)}
                                className={`w-16 h-16 rounded-full border-2 flex items-center justify-center cursor-pointer ${jogosSelecionados.includes(jogo)
                                        ? "border-amber-600"
                                        : "border-black dark:border-white"
                                    }`}
                            >
                                <img src={jogo.imagemUrl} alt={jogo.nome} className="w-14 h-14 rounded-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full mt-4 bg-black dark:bg-white text-white dark:text-black font-bold py-2 px-4 border border-black dark:border-white hover:bg-zinc-800 dark:hover:bg-zinc-800 transition-colors duration-300 disabled:opacity-55"
                    disabled={disabledButtonSubmit()}
                >
                    {isLoading ?
                        <div className="flex justify-center items-center min-h-min">
                            <Spinner />
                            <span className="ml-2">Cadastrando ...</span>
                        </div>
                        : "Cadastrar"}
                </button>
                <button
                    type="button"
                    onClick={retornar}
                    className="w-full mt-4 bg-transparent text-black dark:text-white font-bold py-2 px-4 border border-black dark:border-white hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
                >
                    Voltar

                </button>
            </form>
            )}
        </section>
    );
};

export default Cadastro;
