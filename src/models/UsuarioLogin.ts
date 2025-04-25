interface UsuarioLogin { 
    id?: number;
    nome: string;
    email: string;
    senha: string;
    foto?: string;
    tipo?: string;
    token: string;
}

export default UsuarioLogin;