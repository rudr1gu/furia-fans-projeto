import Usuario from "./Usuario";

interface RedeSocial {
    id?: number;
    nomeRedeSocial: string;
    urlRedeSocial: string;
    usuario: Usuario;
}

export default RedeSocial;