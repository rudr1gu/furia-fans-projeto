import { useNavigate } from "react-router-dom";
import UsuarioService from "../../services/UsuarioService";
import { ChangeEvent, useEffect, useState } from "react";
import Usuario from "../../models/Usuario";
import Jogo from "../../models/Jogo";
import JogoService from "../../services/JogoService";

const Cadastro = () => {
    
    const usuarioService = new UsuarioService();
    const jogoService = new JogoService();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [confirmarSenha, setConfirmarSenha] = useState<string>("");

    const [usuario, setUsuario] = useState<Usuario>({
            nickName: "",
            email: "",
            senha: "",
            tipo: "usuario",
            avatar: "string.png",
            bio: "",
            redeSociais: [],
            jogos: [],
            nivel: {id: 1},
    });

    const [jogosDisponiveis, setJogosDisponiveis] = useState<Jogo[]>([]);
    const [jogosSelecionados, setJogosSelecionados] = useState<Jogo[]>([]);

    const retornar = () => navigate("/login");

    const atualizarEstado = (e: ChangeEvent<HTMLInputElement>) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    };

    const handleConfirmarSenha = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmarSenha(e.target.value);  
    }

    const handleSelecionarJogo = (jogo: Jogo) => {
        if (jogosSelecionados.includes(jogo)) {
            setJogosSelecionados(jogosSelecionados.filter((j) => j !== jogo));
        } else {
            setJogosSelecionados([...jogosSelecionados, jogo]);
        }
    };

    const cadastrar = async(e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(confirmarSenha === usuario.senha && confirmarSenha.length >= 8) {
            setIsLoading(true);

            const usuarioParaCadastrar = {
                ...usuario,
                jogos: jogosSelecionados,
            };

            try {
                await usuarioService.createUsuario(usuarioParaCadastrar, setUsuario);
                alert("Usuário cadastrado com sucesso!");
                retornar();
            } catch (error) {
                alert("Os dados do Usuário estão inconsistentes!");
            }
        }
        else {
            alert("As senhas não conferem ou são menores que 8 caracteres!");
            setUsuario({ ...usuario, senha:''});
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
    }
    , []);
    
    return (
        <section className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <form onSubmit={cadastrar} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Cadastro</h2>

            {/* Campos Nickname, Email, Senha, Confirmar Senha (já tinha) */}
            <div className="mb-4">
                <label className="block text-sm">NickName</label>
                <input
                    id="nickName"
                    type="text"
                    name="nickName"
                    placeholder="seuNickName"
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                    value={usuario.nickName}
                    onChange={atualizarEstado}
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="seunome@email.com"
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                    value={usuario.email}
                    onChange={atualizarEstado}
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm">Senha</label>
                <input
                    id="senha"
                    type="password"
                    name="senha"
                    placeholder="*********"
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                    value={usuario.senha}
                    onChange={atualizarEstado}
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm">Confirmar Senha</label>
                <input
                    id="confirmarSenha"
                    type="password"
                    name="confirmarSenha"
                    placeholder="*********"
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                    value={confirmarSenha}
                    onChange={handleConfirmarSenha}
                    required
                />
            </div>

            {/* Escolher Jogos */}
            <div className="mb-4">
                <label className="block text-sm mb-2">Jogos Favoritos</label>
                <div className="flex flex-wrap gap-2">
                    {jogosDisponiveis.map(jogo => (
                        <label key={jogo.id} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value={jogo.id}
                                checked={jogosSelecionados.includes(jogo)}
                                onChange={() => handleSelecionarJogo(jogo)}
                                className="accent-red-500"
                            />
                            <span className="text-sm">{jogo.nome}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Botões */}
            <button
                type="submit"
                className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                disabled={isLoading}
            >
                {isLoading ? "Cadastrando..." : "Cadastrar"}
            </button>
            <button
                type="button"
                onClick={retornar}
                className="w-full mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
                Voltar
            </button>
        </form>
    </section>
    );
}

export default Cadastro;