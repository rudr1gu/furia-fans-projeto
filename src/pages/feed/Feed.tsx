import { useContext, useEffect, useState } from "react";
import PostagemCard from "../../components/feed/PostagemCard";
import Postagem from "../../models/Postagem";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import PostagemService from "../../services/PostagemService";
import Navbar from "../../components/navbar/Navbar";
import UsuarioService from "../../services/UsuarioService";
import Usuario from "../../models/Usuario";

const Feed = () => {

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const usuarioService = new UsuarioService();
    const postagemService = new PostagemService();

    const [usuarioLogado, setUsuarioLogado] = useState<Usuario>({} as Usuario);

    const navigate = useNavigate();

    const [postagens, setPostagens] = useState<Postagem[]>([]);
    const [newPost, setNewPost] = useState<Postagem>({} as Postagem);

    useEffect(() => {
        if (token) {
            buscarPostagens();
            buscarUsuarioLogado();
        } else {
            handleLogout();
            navigate("/login");
        }
    }, [token]);

    const header = {
        headers: {
            Authorization: token,
        },
    };

    const buscarPostagens = async () => {
        try {
            await postagemService.getAllPostagens(setPostagens, header);
        } catch (error) {
            console.error('Erro ao buscar postagens:', error);
        }
    };

    const buscarUsuarioLogado = async () => {
        try {
            await usuarioService.getByIdUsuario(usuario.id!, setUsuarioLogado, header);
        } catch (error) {
            console.error('Erro ao buscar usuário logado:', error);
        }
    };


    const handlePostSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const postagemData = {
                titulo: "postagem feed",
                conteudo: newPost.conteudo,
                usuario: {id : usuario.id },

            };
            await postagemService.createPostagem(postagemData, header);
            setNewPost((prev) => ({ ...prev, conteudo: "" }));
            await buscarPostagens();
        } catch (error) {
            console.error('Erro ao criar postagem:', error);
        }
    };

    const deletePostagem = async (id: number) => {
        try {
            await postagemService.deletePostagem(id, header);
            await buscarPostagens();
        } catch (error) {
            console.error('Erro ao deletar postagem:', error);
        }
    }

    const ordenarPostagensPorData = (postagens: Postagem[]) => {
        return postagens.sort((a, b) => {
            const dateA = a.dataCriacao ? new Date(a.dataCriacao).getTime() : 0;
            const dateB = b.dataCriacao ? new Date(b.dataCriacao).getTime() : 0;
            return dateB - dateA;
        })
    };

    const postagensOrdenadas = ordenarPostagensPorData(postagens);

    return (
        <section className="bg-zinc-100 dark:bg-zinc-950 min-h-screen">
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-4 mb-8">
                    <form onSubmit={handlePostSubmit}>
                        <div className="flex items-center space-x-3 mb-4">
                            <img
                                src={usuarioLogado.avatar}
                                alt="Your avatar"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <span className="font-medium text-zinc-900 dark:text-white">{usuarioLogado.nickName}</span>
                        </div>
                        <textarea
                            value={newPost.conteudo}
                            onChange={(e) => setNewPost({ ...newPost, conteudo: e.target.value })}
                            required
                            className="w-full p-3 border border-black dark:border-zinc-500 focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-zinc-800 dark:text-white resize-none"
                            placeholder="What's on your mind?"
                            rows={3}
                        />
                        <div className="flex justify-end mt-3">
                            <button
                                type="submit"
                                disabled={!newPost.conteudo}
                                className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span>Post</span>
                                <Send size={18} />
                            </button>
                        </div>
                    </form>
                </div>

                <div className="space-y-6">
                    {postagensOrdenadas.map((post) =>  (
                        <PostagemCard key={post.id} postagem={post} deletePostagem={deletePostagem} usuario={usuarioLogado} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Feed;