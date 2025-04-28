import { useContext, useEffect, useState } from "react";
import Usuario from "../../models/Usuario";

import UsuarioService from "../../services/UsuarioService";

import { AuthContext } from "../../context/AuthContext";
import FanCard from "./FansCard";

interface ModalFansCardProps {
    fan: Usuario;
    onClose: () => void;
}

const ModalFansCard: React.FC<ModalFansCardProps> = ({ fan, onClose }) => {

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const [autorPostagem, setAutorPostagem] = useState<Usuario>({} as Usuario);

    const usuarioService = new UsuarioService();

    const header = {
        headers: {
            Authorization: token,
        },
    };

    const buscarUsuarioLogado = async () => {
        try {
            await usuarioService.getByIdUsuario(fan.id!, setAutorPostagem, header);
        } catch (error) {
            console.error('Erro ao buscar usuário logado:', error);
        }
    };

    useEffect(() => {
        if (token) {
            buscarUsuarioLogado();
        } else {
            handleLogout();
        }
    }, [token]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div
                className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-xl shadow-2xl p-20
                transform transition-all duration-300 ease-out scale-95 opacity-0 animate-fade-in-up"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-red-500 transition-colors text-xl"
                >
                    ×
                </button>

                <div className="flex flex-col items-center">
                    <FanCard fan={autorPostagem} />
                </div>
            </div>
        </div>
    );
};

export default ModalFansCard;
