import avatares from "./avatares/avatares";
import logo from "../../assets/furia.png";
import Spinner from "../../components/ui/Spinner";
import SplashScreen from "../../components/ui/SplashScreen";
import useCadastroUsuario from "../../hooks/useCadastroUsuario";

const Cadastro = () => {

    const {
        usuario,
        confirmarSenha,
        jogosDisponiveis,
        jogosSelecionados,
        avatarSelecionado,
        loading,
        isLoading,
        retornar,
        atualizarEstado,
        handleConfirmarSenha,
        handleSelecionarJogo,
        handleSelecionarAvatar,
        cadastrar,
        disabledButtonSubmit,
    } = useCadastroUsuario();

    return (
        <section className="min-h-screen flex flex-col justify-center items-center bg-zinc-200 dark:bg-zinc-900 transition-colors">
            {loading && <SplashScreen />}

            {!loading && (
                <form onSubmit={cadastrar} className="form-container">
                    <div className="flex justify-center mb-1">
                        <img src={logo} alt="Logo" className="w-20 h-20" />
                    </div>
                    <h2 className="form-title">Cadastre-se</h2>

                    <div className="mb-4">
                        <label className="form-label">NickName</label>
                        <input
                            id="nickName"
                            type="text"
                            name="nickName"
                            placeholder="Nickname"
                            className="form-input"
                            value={usuario.nickName}
                            onChange={atualizarEstado}
                            minLength={5}
                            maxLength={20}
                            required
                        />
                        {
                            usuario.nickName.length > 0 && usuario.nickName.length < 5 && (
                                <p className="text-sm text-red-500">O Nickname deve ter pelo menos 5 caracteres!</p>
                            )
                        }
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="seunome@email.com"
                            className="form-input"
                            value={usuario.email}
                            onChange={atualizarEstado}
                            required
                        />
                        {
                            usuario.email.length > 0 && !usuario.email.includes("@") && (
                                <p className="text-sm text-red-500">Email inválido!</p>
                            )
                        }
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Senha</label>
                        <input
                            id="senha"
                            type="password"
                            name="senha"
                            placeholder="*********"
                            className="form-input"
                            value={usuario.senha}
                            onChange={atualizarEstado}
                            required
                        />
                        {confirmarSenha.length > 0 && (
                            <p className={`text-sm ${confirmarSenha === usuario.senha ? 'text-green-500' : 'text-red-500'}`}>
                                {confirmarSenha === usuario.senha ? 'As senhas conferem!' : 'As senhas não conferem!'}
                            </p>
                        )}
                        {
                            usuario.senha.length > 0 && usuario.senha.length < 8 && (
                                <p className="text-sm text-red-500">A senha deve ter pelo menos 8 caracteres!</p>
                            )
                        }
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Confirmar Senha</label>
                        <input
                            id="confirmarSenha"
                            type="password"
                            name="confirmarSenha"
                            placeholder="*********"
                            className="form-input"
                            value={confirmarSenha}
                            onChange={handleConfirmarSenha}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="form-label">Escolha seu Avatar</label>
                        <div className="flex gap-4 flex-wrap">
                            {avatares.map((avatar) => (
                                <img
                                    key={avatar}
                                    src={avatar}
                                    alt="Avatar"
                                    onClick={() => handleSelecionarAvatar(avatar)}
                                    className={`w-16 h-16 rounded-full object-cover cursor-pointer border-2 ${avatarSelecionado === avatar ? 'border-amber-600' : 'border-black dark:border-white'}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="form-label">Jogos Favoritos</label>
                        <div className="flex gap-4 flex-wrap">
                            {jogosDisponiveis.map(jogo => (
                                <div
                                    key={jogo.id}
                                    onClick={() => handleSelecionarJogo(jogo)}
                                    className={`w-16 h-16 rounded-full border-2 flex items-center justify-center cursor-pointer ${jogosSelecionados.includes(jogo)
                                        ? "border-amber-600"
                                        : "border-black dark:border-white"
                                        }`}
                                >
                                    <img src={jogo.imagemUrl} alt={jogo.nome} className="w-14 h-14 rounded-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="form-button"
                        disabled={disabledButtonSubmit()}
                    >
                        {isLoading ?
                            <div className="flex justify-center items-center min-h-min">
                                <Spinner />
                                <span className="ml-2">Cadastrando ...</span>
                            </div>
                            : "Cadastrar"}
                    </button>
                    <button
                        type="button"
                        onClick={retornar}
                        className="form-button-secondary"
                    >
                        Voltar

                    </button>
                </form>
            )}
        </section>
    );
};

export default Cadastro;