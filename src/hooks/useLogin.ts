import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UsuarioLogin from "../models/UsuarioLogin";
import { AuthContext } from "../context/AuthContext";

const useLogin = () => {
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

    return {
        usuarioLogin,
        atualizarEstado,
        login,
        isLoading,
    };

}

export default useLogin;