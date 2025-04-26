import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import UsuarioLogin from "../../models/UsuarioLogin";
import logo from "../../assets/logo-furia.svg";

const Login = () => {

    const navigate = useNavigate();
    const { usuario, handleLogin, isLoading } = useContext(AuthContext);

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

    const login = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleLogin(usuarioLogin);
    };

    return (
        <section className="min-h-screen flex flex-col justify-center items-center bg-zinc-200 dark:bg-zinc-900 transition-colors">
            <form onSubmit={login} className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white dark:bg-zinc-950 transition-colors">
                <div className="flex justify-center mb-1">
                    <img src={logo} alt="Logo" className="w-20 h-20" />
                </div>
                <h2 className="text-3xl font-bold mb-6 text-center text-black dark:text-white">Login</h2>

                <div className="mb-4">
                    <label className="block text-sm text-black dark:text-white mb-1">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="seu@email.com"
                        className="w-full px-3 py-2 border border-black dark:border-white bg-transparent text-black dark:text-white focus:outline-none"
                        value={usuarioLogin.email}
                        onChange={atualizarEstado}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm text-black dark:text-white mb-1">Senha</label>
                    <input
                        id="senha"
                        type="password"
                        name="senha"
                        placeholder="*********"
                        className="w-full px-3 py-2 border border-black dark:border-white bg-transparent text-black dark:text-white focus:outline-none"
                        value={usuarioLogin.senha}
                        onChange={atualizarEstado}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full mt-4 bg-black dark:bg-white text-white dark:text-black font-bold py-2 px-4 border border-black dark:border-white hover:bg-zinc-800 dark:hover:bg-zinc-800 transition-colors"
                    disabled={isLoading}
                >
                    {isLoading ? "Logando..." : "Entrar"}
                </button>
            </form>
        </section>

    );
}

export default Login;