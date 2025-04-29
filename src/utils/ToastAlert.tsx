import { toast } from "react-toastify";
import logo from "../assets/furia.png";


const CustomToast = ({ title, message }: { title: string; message: string }) => (
  <div className="flex items-center gap-3">
    <img src={logo} alt="Logo" className="w-8 h-8 rounded-full" />
    <div className="flex flex-col">
      <strong className="text-sm text-white">{title}</strong>
      <span className="text-xs text-gray-200">{message}</span>
    </div>
  </div>
);


const ToastAlert = (mensagem: string, tipo: string) => {
  const commonOptions = {
    position: "top-right" as const,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark" as const,
  };

  switch (tipo) {
    case "sucesso":
      toast.success(<CustomToast title="Sucesso" message={mensagem} />, commonOptions);
      break;

    case "erro":
      toast.error(<CustomToast title="Erro" message={mensagem} />, commonOptions);
      break;

    case "info":
    default:
      toast.info(<CustomToast title="Informação" message={mensagem} />, commonOptions);
      break;
  }
};

export default ToastAlert;
