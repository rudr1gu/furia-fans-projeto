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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-4">
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-3">
                        <img
                            src={postagem.usuario.avatar}
                            alt={postagem.usuario.nickName}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{postagem.usuario.nickName}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(postagem.dataCriacao!)}</p>
                        </div>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                        <MoreHorizontal size={20} />
                    </button>
                </div>

                <p className="text-gray-800 dark:text-gray-200 mb-4">{postagem.conteudo}</p>

                {postagem.imagemUrl && (
                    <div className="rounded-lg overflow-hidden mb-4">
                        <img src={postagem.imagemUrl} alt="Post content" className="w-full object-cover" />
                    </div>
                )}
                <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                    <button className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
                        <MessageCircle size={20} />
                        <span>{postagem.respostas?.length}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostagemCard;