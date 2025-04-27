
interface ModalConfirmarSenhaProps {
    confirmarSenha: string;
    setConfirmarSenha: (senha: string) => void;
    setModalOpen: (open: boolean) => void;
    confirmarAlteracoes: () => void;
}

const ModalConfirmarSenha = ({confirmarSenha, setConfirmarSenha, setModalOpen, confirmarAlteracoes}: ModalConfirmarSenhaProps) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded shadow-md w-96">
                <h2 className="text-lg font-semibold text-center mb-4 dark:text-white">Confirme sua senha</h2>
                <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    className="w-full p-2 border border-black dark:border-zinc-800 focus:ring-2 focus:ring-black dark:bg-zinc-900 dark:text-white mb-4"
                />
                <div className="flex justify-between">
                    <button
                        onClick={() => setModalOpen(false)}
                        className="px-4 py-2 bg-zinc-700 hover:bg-zinc-800 text-white rounded"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={confirmarAlteracoes}
                        className="px-4 py-2 bg-black hover:bg-zinc-950 text-white rounded"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalConfirmarSenha;