import { useNavigate } from "react-router-dom";
import UsuarioService from "../../services/UsuarioService";
import { ChangeEvent, useState } from "react";
import Usuario from "../../models/Usuario";

const Cadastro = () => {
    
    const usuarioService = new UsuarioService();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [confirmarSenha, setConfirmarSenha] = useState<string>("");

    const [usuario, setUsuario] = useState<Usuario>({
        nickName: "",
        email: "",
        senha: "",
        avatar: "imagemdefault.png",
        tipo: "usuario",
    });

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

    const cadastrar = async(e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(confirmarSenha === usuario.senha && confirmarSenha.length >= 8) {
            setIsLoading(true);
            try {
                await usuarioService.createUsuario(usuario, setUsuario);
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
    
    return (
        <section className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <form onSubmit={cadastrar} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Cadastro</h2>
                <div className="mb-4">
                    <label className="block text-sm">NickName</label>
                    <input
                        id="nickName"
                        type="text"
                        name="nickName"
                        placeholder="seuNickName"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        value={usuario.nickName}
                        onChange={(e) => atualizarEstado(e)}
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
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        value={usuario.email}
                        onChange={(e) => atualizarEstado(e)}
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
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        value={usuario.senha}
                        onChange={(e) => atualizarEstado(e)}
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
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        value={confirmarSenha}
                        onChange={(e) => handleConfirmarSenha(e)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={isLoading}
                >Cadastrar</button>
                <button
                    type="button"
                    onClick={retornar}
                    className="w-full mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >Voltar</button>
            </form>    
        </section>
    );
}

export default Cadastro;