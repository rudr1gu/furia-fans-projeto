import { useContext, useEffect, useState } from "react";
import UsuarioService from "../../services/UsuarioService";
import Usuario from "../../models/Usuario";
import FansCard from "../../components/fans/FansCard";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Fans = () => {

    const usuarioService = new UsuarioService();
    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const {usuario, handleLogout  } = useContext(AuthContext);
    const token = usuario.token;

    const buscarUsuarios = async () => {
        try {
            await usuarioService.getAllUsuarios(setUsuarios, {
                headers: { Authorization: token },
            });
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            handleLogout();
        }
    }

    useEffect(() => {
        if (token) {
            buscarUsuarios();
        } else {
            handleLogout();
            navigate("/login");
        }
    }
    , [token]);

    return (
        <>
        <Navbar />
        {usuarios.length > 0 ? (
            <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 py-10 px-4 ">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-3">
                    {usuarios.map((usuario) => (
                        <FansCard key={usuario.id} fan={usuario} />
                    ))}
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
}

export default Fans;