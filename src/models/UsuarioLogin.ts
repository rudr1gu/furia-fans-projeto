interface UsuarioLogin { 
    id?: number;
    nome: string;
    email: string;
    senha: string;
    foto?: Date;
    tipo?: Date;
    token: string;
}

export default UsuarioLogin;