interface ModalDeleteProps {
    onClose?: () => void;
    onDelete: () => void;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({ onDelete, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-lg w-80">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Confirmação</h2>
                <p className="text-zinc-600 dark:text-zinc-300 mb-6">Tem certeza que deseja excluir esta postagem?</p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md bg-zinc-300 dark:bg-zinc-700 text-zinc-800 dark:text-white hover:bg-zinc-400 dark:hover:bg-zinc-600 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onDelete}
                        className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
                    >
                        Deletar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalDelete;
