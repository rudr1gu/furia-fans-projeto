import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Postagem from "../../models/Postagem";
import Resposta from "../../models/Resposta";
import RespostaService from "../../services/RespostaService";
import { AuthContext } from "../../context/AuthContext";
import ToastAlert from "../../utils/ToastAlert";
import Spinner from "../ui/Spinner";


interface ModalRespostaProps {
  postagem: Postagem;
  respostas: Resposta[];
  onClose: () => void;
  reloadPostagem: () => void;
}

interface ModeloResposta {
  conteudo: string;
  usuario: {
    id: number;
  }
  postagem: {
    id: number;
  };
}

const ModalResposta: React.FC<ModalRespostaProps> = ({ postagem, respostas, onClose, reloadPostagem }) => {

  const [sending, setSending] = useState<boolean>(false);

  const { usuario } = useContext(AuthContext);

  const token = usuario.token


  const header = {
    headers: {
      Authorization: token,
    },
  };

  const [novaResposta, setNovaResposta] = useState<ModeloResposta>({} as ModeloResposta);

  const respostaService = new RespostaService();

  const handleSubmit = async () => {
    if (novaResposta.conteudo.length < 5 || novaResposta.conteudo.length > 280) {
      ToastAlert("O conteúdo da resposta deve ter entre 5 e 280 caracteres.", "erro");
      return;
    }
    setSending(true);

    const resposta = {
      conteudo: novaResposta.conteudo,
      usuario: {
        id: usuario.id,
      },
      postagem: {
        id: postagem.id,
      },
    };


    try {
      await respostaService.createResposta(resposta, header);
      ToastAlert("Resposta enviada com sucesso!", "sucesso");
      reloadPostagem();
      setNovaResposta((prev) => ({ ...prev, conteudo: "" }));
    } catch (error) {
      console.error("Erro ao enviar resposta:", error);
    }
    setSending(false);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-40"
        onClick={onClose}
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 h-full w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white dark:bg-zinc-900 z-50 shadow-2xl flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Responder</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-red-500 transition-colors">
            <X size={28} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="mb-4">
            <h3 className="text-md font-semibold text-zinc-700 dark:text-white">{postagem.usuario.nickName}</h3>
            <p className="text-zinc-600 dark:text-zinc-300">{postagem.conteudo}</p>
          </div>
          <div className="space-y-4">
            {respostas.length > 0 ? (
              respostas.map((resposta) => (
                <div key={resposta.id} className="p-3 bg-zinc-100 dark:bg-zinc-700 rounded-md">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={resposta.usuario?.avatar}
                      alt={`Avatar de ${resposta.usuario?.nickName}`}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                        {resposta.usuario?.nickName}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {new Date(resposta.dataCriacao!).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-800 dark:text-zinc-200">{resposta.conteudo}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-zinc-500 dark:text-zinc-400">Ainda não há respostas.</p>
            )}

          </div>
        </div>
        <div className="border-t border-zinc-200 dark:border-zinc-700 p-4 flex flex-col gap-3">
          <textarea
            className="w-full p-3 border border-black dark:border-white bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 resize-none focus:outline-none"
            rows={3}
            placeholder="Escreva sua resposta..."
            value={novaResposta.conteudo}
            onChange={(e) => setNovaResposta({ ...novaResposta, conteudo: e.target.value })}
          />
          {novaResposta.conteudo && (
            <div className="flex justify-end mb-2">
              <span className="text-sm text-zinc-500 dark:text-zinc-400">{novaResposta.conteudo.length}/280</span>
            </div>
          )}
          {novaResposta.conteudo && (
            <div className="flex justify-end mb-2">
              <span className="text-sm text-zinc-500 dark:text-zinc-400">O Minimo de caracteres é 5 e o Máximo 280 caracteres</span>
            </div>
          )}
          <button
            onClick={handleSubmit}
            disabled={!novaResposta.conteudo}
            type="button"
            className="self-end bg-black hover:bg-zinc-700 text-white px-4 py-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? (
              <div className="flex items-center space-x-2">
                <Spinner size={4} />
                <span>Enviando...</span>
              </div>
            ) : (
              "Enviar Resposta"
            )}
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default ModalResposta;
