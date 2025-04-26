import { useNavigate } from "react-router-dom";
import UsuarioService from "../../services/UsuarioService";
import { useContext, useEffect, useState } from "react";
import Usuario from "../../models/Usuario";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar";
import FansCard from "../../components/fans/FansCard";
import JogoService from "../../services/JogoService";
import Jogo from "../../models/Jogo";



const Fans = () => {
    const usuarioService = new UsuarioService();
    const jogoService = new JogoService()

    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [usuariosFiltrados, setUsuariosFiltrados] = useState<Usuario[]>([]);
    const [filtroNome, setFiltroNome] = useState("");
    const [filtroJogo, setFiltroJogo] = useState("");


    const [jogos, setJogos] = useState<Jogo[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const buscarUsuarios = async () => {
        try {
            await usuarioService.getAllUsuarios((data: Usuario[]) => {
                setUsuarios(data);
                setUsuariosFiltrados(data);
            }, {
                headers: { Authorization: token },
            });
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            handleLogout();
        }
    };

    const buscarJogos = async () => {
        try {
            const jogo = await jogoService.getAllJogos()
            setJogos(jogo);

        } catch (error) {
            console.error("Erro ao buscar jogos:", error);
        }
    };

    useEffect(() => {
        buscarJogos();
    }
        , []);

    useEffect(() => {
        if (token) {
            buscarUsuarios();
        } else {
            handleLogout();
            navigate("/login");
        }
    }, [token]);

    const filtrarPorNome = (nome: string) => {
        setFiltroNome(nome);
        aplicarFiltros(nome, filtroJogo);
    };
    
    const filtrarPorJogo = (descricaoJogo: string) => {
        setFiltroJogo(descricaoJogo);
        aplicarFiltros(filtroNome, descricaoJogo);
    };
    
    const aplicarFiltros = (nome: string, descricaoJogo: string) => {
        let filtrados = usuarios;
    
        if (nome.trim() !== "") {
            filtrados = filtrados.filter((u) =>
                u.nickName.toLowerCase().includes(nome.toLowerCase())
            );
        }
    
        if (descricaoJogo.trim() !== "") {
            filtrados = filtrados.filter((u) =>
                u.jogos!.some((jogo) =>
                    jogo.descricao.toLowerCase().includes(descricaoJogo.toLowerCase())
                )
            );
        }

        setUsuariosFiltrados(filtrados);
    }
    
    return (
        <>
            <Navbar />
            {usuarios.length > 0 ? (
                <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 py-10 px-4">
                    <div className="max-w-7xl mx-auto flex flex-col gap-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Filtrar por nome..."
                                value={filtroNome}
                                onChange={(e) => filtrarPorNome(e.target.value)}
                                className="w-full sm:w-1/2 p-2 rounded border dark:bg-zinc-900 dark:border-zinc-700 dark:text-white"
                            />
                            <select
                                value={filtroJogo}
                                onChange={(e) => filtrarPorJogo(e.target.value)}
                                className="w-full sm:w-1/2 p-2 rounded border dark:bg-zinc-900 dark:border-zinc-700 dark:text-white"
                            >
                                <option value="">Todos os Jogos</option>
                                {jogos.map((jogo) => (
                                    <option key={jogo.id} value={jogo.descricao}>
                                        {jogo.descricao}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                            {usuariosFiltrados.map((usuario) => (
                                <FansCard key={usuario.id} fan={usuario} />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center min-h-screen bg-zinc-100 dark:bg-zinc-950">
                    <button
                        onClick={buscarUsuarios}
                        className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg shadow-md transition-all"
                    >
                        Buscar Usuários
                    </button>
                </div>
            )}
        </>
    );
};

export default Fans;