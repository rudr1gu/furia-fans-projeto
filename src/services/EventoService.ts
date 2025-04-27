import baseApi from "./baseApi";

class EventoService {
    getAllEventos = async (setDados: Function, header: Object) => {
        const response = await baseApi.get("/eventos/all", header);
        setDados(response.data);
    }
}

export default EventoService;