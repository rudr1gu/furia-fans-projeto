import baseApi from "./baseApi";
import Jogo from "../models/Jogo";

class JogoService {

    getAllJogos = async(): Promise<Jogo[]> => {
        const response = await baseApi.get<Jogo[]>('/jogos/all');
        return response.data;
    }

}

export default JogoService;