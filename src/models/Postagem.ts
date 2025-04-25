import Resposta from "./Resposta";

interface Postagem {

    id?: number;
    titulo: string;
    conteudo: string;
    imagemUrl?: string;
    dataCriacao?: Date;
    dataAtualizacao?: Date;
    respostas?: Resposta[];
}

export default Postagem;