import baseApi from "./baseApi";

class PostagemService {
    getAllPostagens = async (setDados: Function, header: Object) => {
        const response = await baseApi.get("/postagens/all", header);
        setDados(response.data);
    }

    getByIdPostagem = async (id: number, setDados: Function, header: Object) => {
        const response = await baseApi.get(`/postagens/${id}`, header);
        setDados(response.data);
    }

    createPostagem = async (postagem: Object, header: Object) => {
        const response = await baseApi.post('/postagens/cadastrar', postagem, header);
        return response.data;
    }

    deletePostagem = async (id: number, header: Object) => {
        const response = await baseApi.delete(`/postagens/${id}`, header);
        return response.data;
    }
}

export default PostagemService;