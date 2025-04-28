import { MessageCircle, Trash } from "lucide-react";
import Postagem from "../../models/Postagem"
import Usuario from "../../models/Usuario";
import ModalDelete from "./ModalDelete";
import { useContext, useState } from "react";
import ModalFansCard from "../fans/ModalFansCard";
import ModalResposta from "./ModalResposta";
import PostagemService from "../../services/PostagemService";
import { AuthContext } from "../../context/AuthContext";

interface PostagemCardProps {
    postagem: Postagem;
    deletePostagem: Function;
    fan: Usuario;
}

const PostagemCard: React.FC<PostagemCardProps> = ({ postagem, deletePostagem, fan }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [IsFanCardOpen, setIsFanCardOpen] = useState(false);
    const [postagemAtualizada, setPostagemAtualizada] = useState<Postagem>({} as Postagem);

    const [showModalResposta, setShowModalResposta] = useState(false);

    const postagemService = new PostagemService();

    const { usuario } = useContext(AuthContext);
    const token = usuario.token;

    const header = {
        headers: {
            Authorization: token,
        },
    };

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

    const onDelete = () => {
        deletePostagem(postagem.id);
    }

    const onClose = () => {
        setIsOpen(false);
    }

    const onOpen = () => {
        setIsOpen(true);
    }

    const onCloseFanCard = () => {
        setIsFanCardOpen(false);
    }

    const buscarPostagemAtualizada = async() => {
        try {
            await postagemService.getByIdPostagem(postagem.id!, setPostagemAtualizada, header);
        } catch (error) {
            console.error('Erro ao buscar postagem atualizada:', error);
        }  
    }

    const handleOpenModalResposta = async () => {
        await buscarPostagemAtualizada();
        setShowModalResposta(true);
    };

    return (
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden mb-4">
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-3">
                        <button onClick={() => setIsFanCardOpen(true)} className="flex items-center space-x-3">
                            <img
                                src={postagem.usuario.avatar}
                                alt={postagem.usuario.nickName}
                                className="w-10 h-10 rounded-full object-cover"
                            />

                        </button>
                        <div>
                            <h3 className="font-semibold text-zinc-900 dark:text-white">{postagem.usuario.nickName}</h3>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">{formatDate(postagem.dataCriacao!)}</p>
                        </div>
                    </div>
                    {usuario.id === postagem.usuario.id &&
                        <button onClick={onOpen} className="text-zinc-500 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-500 transition-colors">
                            <Trash size={20} />
                        </button>
                    }
                    {isOpen &&
                        <ModalDelete onClose={onClose} onDelete={onDelete} />
                    }
                    {IsFanCardOpen && <ModalFansCard fan={postagem.usuario} onClose={onCloseFanCard} />}
                    {showModalResposta && (
                        <ModalResposta
                            postagem={postagemAtualizada}
                            respostas={postagemAtualizada.respostas!}
                            onClose={() => setShowModalResposta(false)}
                            reloadPostagem={buscarPostagemAtualizada}
                        />
                    )}


                </div>

                <p className="text-zinc-800 dark:text-zinc-200 mb-4">{postagem.conteudo}</p>
                <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-700">
                    <button
                        onClick={handleOpenModalResposta}
                        className="flex items-center space-x-1 text-zinc-500 dark:text-zinc-400 hover:text-blue-500 transition-colors">
                        <MessageCircle size={20} />
                        <span>{postagem.respostas?.length}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostagemCard;