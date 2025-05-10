import { useNavigate } from "react-router-dom";
import JogoService from "../services/JogoService";
import UsuarioService from "../services/UsuarioService";
import { ChangeEvent, useEffect, useState } from "react";
import Usuario from "../models/Usuario";
import Jogo from "../models/Jogo";
import ToastAlert from "../utils/ToastAlert";

const useCadastroUsuario = () => {
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

    return {
        usuario,
        jogosDisponiveis,
        jogosSelecionados,
        avatarSelecionado,
        loading,
        isLoading,
        confirmarSenha,
        retornar,
        atualizarEstado,
        handleConfirmarSenha,
        handleSelecionarJogo,
        handleSelecionarAvatar,
        cadastrar,
        disabledButtonSubmit,
    };

}

export default useCadastroUsuario;