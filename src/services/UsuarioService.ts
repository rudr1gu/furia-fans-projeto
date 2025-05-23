import Usuario from "../models/Usuario";
import baseApi from "./baseApi";

class UsuarioService {

    createUsuario = async(usuario: Usuario, setDados: Function) => {
        const response = await baseApi.post<Usuario>('/usuarios/cadastrar', usuario);
        setDados(response.data);
    }

    getAllUsuarios = async(setDados: Function, header: Object) => {
        const response = await baseApi.get<Usuario[]>('/usuarios/all', header);
        setDados(response.data);
    }

    loginUsuario = async(usuario: Object, setDados: Function) => {
        const response = await baseApi.post<Usuario>('/usuarios/logar', usuario);
        setDados(response.data);
    }

    getByIdUsuario = async(id: number, setDados: Function, header: Object) => {
        const response = await baseApi.get<Usuario>(`/usuarios/${id}`, header);
        setDados(response.data);
    }

    updateUsuario = async(usuario: Object, setDados: Function, header: Object) => {
        const response = await baseApi.put<Usuario>(`/usuarios/atualizar`, usuario , header);
        setDados(response.data);
    }
    
    deleteUsuario = async(id: number, setDados: Function) => {
        const response = await baseApi.delete<Usuario>(`/usuarios/deletar/${id}`);
        setDados(response.data);
    }
}
export default UsuarioService