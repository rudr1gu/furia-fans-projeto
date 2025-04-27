import { useContext, useEffect, useState } from "react";
import PostagemCard from "../../components/feed/PostagemCard";
import Postagem from "../../models/Postagem";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import PostagemService from "../../services/PostagemService";
import Navbar from "../../components/navbar/Navbar";

const Feed = () => {

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const postagemService = new PostagemService();

    const navigate = useNavigate();

    const [postagens, setPostagens] = useState<Postagem[]>([]);
    const [newPost, setNewPost] = useState<Postagem>({} as Postagem);

    useEffect(() => {
        if (!token) {
            navigate('/login');
            handleLogout();
        } else {
            buscarPostagens();
        }

    }, [token, navigate]);

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

    const handlePostSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Aqui você pode fazer a chamada para criar uma nova postagem
            // await postagemService.createPostagem(newPost, setPostagens, header);
            setNewPost({} as Postagem); // Limpa o campo de texto após o envio
        } catch (error) {
            console.error('Erro ao criar postagem:', error);
        }
    };

    return (
        <section className="bg-zinc-100 dark:bg-zinc-950 min-h-screen">
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-4 mb-8">
                    <form onSubmit={handlePostSubmit}>
                        <div className="flex items-center space-x-3 mb-4">
                            <img
                                src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                alt="Your avatar"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <span className="font-medium text-zinc-900 dark:text-white">Current User</span>
                        </div>
                        <textarea
                            value={newPost.conteudo}
                            onChange={(e) => setNewPost({ ...newPost, conteudo: e.target.value })}
                            required
                            className="w-full p-3 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-zinc-700 dark:text-white resize-none"
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
                    {postagens.map((post) => (
                        <PostagemCard key={post.id} postagem={post} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Feed;