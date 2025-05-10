import { Link } from "react-router-dom";
import logoFuria from "../../assets/furia.png";
import Spinner from "../../components/ui/Spinner";
import useLogin from "../../hooks/useLogin";

const Login = () => {

    const {
        usuarioLogin,
        atualizarEstado,
        login,
        isLoading,
    } = useLogin();

    return (
        <section className="min-h-screen flex flex-col justify-center items-center bg-zinc-200 dark:bg-zinc-900 transition-colors">
            <form onSubmit={login} className="form-container">
                <div className="flex justify-center mb-1">
                    <img src={logoFuria} alt="Logo" className="w-20 h-20" />
                </div>
                <h2 className="form-title">Login</h2>

                <div className="mb-4">
                    <label className="form-label">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="seu@email.com"
                        className="form-input"
                        value={usuarioLogin.email}
                        onChange={atualizarEstado}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Senha</label>
                    <input
                        id="senha"
                        type="password"
                        name="senha"
                        placeholder="*********"
                        className="form-input"
                        value={usuarioLogin.senha}
                        onChange={atualizarEstado}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="form-button"
                    disabled={isLoading}
                >
                    {isLoading ?
                        <div className="flex justify-center items-center min-h-min">
                            <Spinner />
                            <span className="ml-2">Entrando ...</span>
                        </div>
                        : "Entrar"}
                </button>
                <p className="mt-4 text-sm text-center text-black dark:text-white">
                    Não tem uma conta?{" "}
                    <Link to="/cadastro" className="text-blue-500 hover:underline">
                        Cadastre-se
                    </Link>
                </p>
            </form>
        </section>
    );
}

export default Login;