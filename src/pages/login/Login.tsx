import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import UsuarioLogin from "../../models/UsuarioLogin";

const Login = () => {

    const navigate = useNavigate();
    const {usuario, handleLogin, isLoading} = useContext(AuthContext);

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);

    useEffect(() => {
        if (usuario.token) {
            navigate("/home");
        }
    }, [usuario]);
    
    const atualizarEstado = (e: ChangeEvent<HTMLInputElement>) => {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value,
        });
    };

    const login =(e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleLogin(usuarioLogin);
    };

    return (
        <section className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <form onSubmit={login}>
            <div>
                <label className="block text-sm">Email</label>
                <input
                id="usuario"
                type="email"
                name="email"
                placeholder="seu@email.com"
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                value={usuarioLogin.email}
                onChange={(e) => atualizarEstado(e)}
                required
                />
            </div>
            <div>
                <label className="block text-sm">Senha</label>
                <input
                id="senha"
                type="password"
                name="senha"
                placeholder="*********"
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                value={usuarioLogin.senha}
                onChange={(e) => atualizarEstado(e)}
                required
                />
            </div>
            <button
                type="submit"
                className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={isLoading}
            >Logar</button>
            </form>

        </section>
    );
}

export default Login;