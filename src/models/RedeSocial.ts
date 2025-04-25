import Usuario from "./Usuario";

interface RedeSocial {
    id?: number;
    nomeredeSocial: string;
    urlRedeSocial: string;
    usuario: Usuario;
}

export default RedeSocial;