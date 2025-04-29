import Usuario from "./Usuario";

interface Resposta {
    id?: number;
    conteudo: string;
    dataCriacao?: Date;
    dataAtualizacao?: Date;
    usuario: Usuario;
}

export default Resposta;