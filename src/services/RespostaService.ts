import baseApi from "./baseApi";


class RespostaService {

    getAllRespostas = async ( setDados: Function, header: Object) => {
        const response = await baseApi.get('/respostas/all', header);
        setDados(response.data);
    }

    createResposta = async (respota: Object, header: Object) => {
        const response = await baseApi.post('/respostas/cadastrar', respota, header);
        return response.data;
    }

}

export default RespostaService;