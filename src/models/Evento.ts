interface Evento{
    id?: number;
    titulo: string;
    descricao: string;
    dataInicio: Date;
    horaInicio: Date;
    localizacao: string;
    link: string;
    imagemUrl: string;
}

export default Evento;