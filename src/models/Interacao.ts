import Postagem from "./Postagem";
import Usuario from "./Usuario";

interface Interacao {
    id?: number;
    tipo: string;
    usuario: Usuario; 
    postagem: Postagem; 
}

export default Interacao;