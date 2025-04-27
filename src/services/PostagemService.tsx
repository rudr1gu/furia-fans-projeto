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

    createPostagem = async (postagem: Object, setDados: Function, header: Object) => {
        const response = await baseApi.post('/postagens/cadastrar', postagem, header);
        setDados(response.data);
    }
}

export default PostagemService;