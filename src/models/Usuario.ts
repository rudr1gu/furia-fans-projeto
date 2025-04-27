import Jogo from "./Jogo";
import Nivel from "./Nivel";
import Postagem from "./Postagem";
import RedeSocial from "./RedeSocial";
import Resposta from "./Resposta";

interface Usuario {
    id?: number;
    nickName: string;
    email: string;
    senha: string;
    tipo: string;
    bio?: string;
    avatar?: string;
    dataCriacao?: Date;
    postagens?: Postagem[];
    respostas?: Resposta[];
    redesSociais?: RedeSocial[];
    nivel?: Nivel;
    jogos?: Jogo[];
}

export default Usuario;