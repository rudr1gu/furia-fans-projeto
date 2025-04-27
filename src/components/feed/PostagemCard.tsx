import { MessageCircle, MoreHorizontal } from "lucide-react";
import Postagem from "../../models/Postagem"

interface PostagemCardProps {
    postagem: Postagem;
}

const PostagemCard: React.FC<PostagemCardProps> = ({ postagem }) => {

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(date).toLocaleDateString('pt-BR', options);
    };


    return (
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden mb-4">
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-3">
                        <img
                            src={postagem.usuario.avatar}
                            alt={postagem.usuario.nickName}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <h3 className="font-semibold text-zinc-900 dark:text-white">{postagem.usuario.nickName}</h3>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">{formatDate(postagem.dataCriacao!)}</p>
                        </div>
                    </div>
                    <button className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300">
                        <MoreHorizontal size={20} />
                    </button>
                </div>

                <p className="text-zinc-800 dark:text-zinc-200 mb-4">{postagem.conteudo}</p>

                {postagem.imagemUrl && (
                    <div className="rounded-lg overflow-hidden mb-4">
                        <img src={postagem.imagemUrl} alt="Post content" className="w-full object-cover" />
                    </div>
                )}
                <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-700">
                    <button className="flex items-center space-x-1 text-zinc-500 dark:text-zinc-400 hover:text-blue-500 transition-colors">
                        <MessageCircle size={20} />
                        <span>{postagem.respostas?.length}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostagemCard;