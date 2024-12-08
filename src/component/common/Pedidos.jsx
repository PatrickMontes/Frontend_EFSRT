import { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import { toast, ToastContainer } from "react-toastify"; // Importa toast y ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Estilos de react-toastify

const Pedidos = () => {
    const [usuario, setUsuario] = useState(null); // Datos completos del usuario
    const [pedidos, setPedidos] = useState([]);  // Lista actualizada de pedidos

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const usuarioId = 7; // Cambia por la lógica que obtenga el ID dinámicamente si es necesario
                const usuarioData = await ApiService.obtenerUsuarioDetalle(usuarioId);
                const nuevosPedidos = usuarioData.listaItemsPedido || [];

                // Compara los estados de los pedidos
                nuevosPedidos.forEach((pedido) => {
                    const pedidoExistente = pedidos.find((p) => p.id === pedido.id);
                    if (pedidoExistente && pedidoExistente.estado !== pedido.estado) {
                        // Verifica si existe el nombre del producto
                        const nombreProducto = pedido.nombreProducto || pedido.producto?.nombre || "Producto desconocido";
                        // Muestra el toast con el nombre del producto
                        toast(`El pedido del producto "${nombreProducto}" cambió a ${pedido.estado}`);
                    }
                });

                // Actualiza los pedidos y el usuario completo
                setPedidos(nuevosPedidos);
                setUsuario(usuarioData);
            } catch (error) {
                console.error("Error al obtener los pedidos:", error);
            }
        }, 5000); // Intervalo de 5 segundos

        return () => clearInterval(interval); // Limpia el intervalo al desmontar
    }, [pedidos]);

    return (
        <>
            {/* Este contenedor es necesario para que se muestren las notificaciones */}
            <ToastContainer />
        </>
    );
};

export default Pedidos;
