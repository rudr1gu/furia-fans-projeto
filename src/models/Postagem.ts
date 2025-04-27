import Resposta from "./Resposta";
import Usuario from "./Usuario";

interface Postagem {

    id?: number;
    titulo: string;
    conteudo: string;
    imagemUrl?: string;
    dataCriacao?: Date;
    dataAtualizacao?: Date;
    respostas?: Resposta[];
    usuario: Usuario;
}

export default Postagem;