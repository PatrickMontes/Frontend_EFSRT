import axios from "axios";

export default class ApiService{

    static BASE_URL = "http://localhost:8080"

    
    static getHeader(){
        const token = localStorage.getItem("token")

        return{
            Authorization : `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }



    //*** Autorizacion y Usuarios API***//
    static async registrarUsuario(registrar){
        const response = await axios.post(`${this.BASE_URL}/autenticacion/registrar`, registrar)
        return response.data
    }


    static async loginUsuario(login){
        const response = await axios.post(`${this.BASE_URL}/autenticacion/login`, login)
        return response.data
    }


    static async getUsuarioInfo(){
        const response = await axios.get(`${this.BASE_URL}/usuario/miInformacion`, {
            headers: this.getHeader()
        })
       
        return response.data
    }



    //*** Producto ENDPOINT***//
    static async agregarProducto(formData){
        const response = await axios.post(`${this.BASE_URL}/producto/crear`, formData, {
            headers: {
                ...this.getHeader(),
                "Content-Type": "multipart/form-data"
            }
        })

        return response.data
    }


    static async actualizar(productoId, formData){
        const response = await axios.put(`${this.BASE_URL}/producto/actualizar/${productoId}`, formData, {
            headers: {
                ...this.getHeader(),
                "Content-Type": "multipart/form-data"
            }
        })

        return response.data
    }


    static async getAllProductos(){
        const response = await axios.get(`${this.BASE_URL}/producto/getAll`)
        return response.data
    }


    static async buscar(valor){
        const response = await axios.get(`${this.BASE_URL}/producto/buscar`, {
            params: (valor)
        })

        return response.data
    }


    static async getAllProductosPorCategoriaId(categoriaId){
        const response = await axios.get(`${this.BASE_URL}/producto/getProductosPorCategoria/${categoriaId}`)
        return response.data
    }


    static async getAllProductosPorId(productoId){
        const response = await axios.get(`${this.BASE_URL}/producto/getProductoPorId/${productoId}`)
        return response.data
    }


    static async eliminarProducto(productoId){
        const response = await axios.delete(`${this.BASE_URL}/producto/eliminar/${productoId}`, {
            headers: this.getHeader()
        })

        return response.data
    }
    


    //*** Categoria ENDPOINT***//
    static async crearCategoria(body){
        const response = await axios.post(`${this.BASE_URL}/categoria/crear`, body, {
            headers: this.getHeader()
        })

        return response.data
    }


    static async getAllCategorias(){
        const response = await axios.get(`${this.BASE_URL}/categoria/getAll`)
        return response.data
    }


    static async getCategoriaPorId(categoriaId){
        const response = await axios.get(`${this.BASE_URL}/categoria/getCategoriaPorId/${categoriaId}`)
        return response.data
    }


    static async actualizarCategoria(body, categoriaId){
        const response = await axios.put(`${this.BASE_URL}/categoria/actualizar/${categoriaId}`, body, {
            headers: this.getHeader()
        })

        return response.data
    }


    static async eliminarCategoria(categoriaId){
        const response = await axios.delete(`${this.BASE_URL}/categoria/eliminar/${categoriaId}`, {
            headers: this.getHeader()
        })

        return response.data
    }
 


    //*** Pedido ENDPOINT***//
    static async crearPedido(body){
        const response = await axios.post(`${this.BASE_URL}/pedido/realizar`, body, {
            headers: this.getHeader()
        })

        return response.data
    }


    static async getAllPedidos(){
        const response = await axios.get(`${this.BASE_URL}/pedido/filtrar`)
        return response.data
    }


    static async getAllPedidoItemPorId(itemId){
        const response = await axios.get(`${this.BASE_URL}/pedido/filtrar`, {
            headers: this.getHeader(),
            params: {itemId}
        })
        return response.data
    }


    static async getAllPedidoItemPorEstado(estado){
        const response = await axios.get(`${this.BASE_URL}/pedido/filtrar`, {
            headers: this.getHeader(),
            params: {estado}
        })
        return response.data
    }


    static async actualizarPedidoItemEstado(itemPedidoId, estado){
        const response = await axios.get(`${this.BASE_URL}/pedido/actualizarEstadoItemPedido/${itemPedidoId}`, {
            headers: this.getHeader(),
            params: {estado}
        })
        return response.data
    }
    


    //*** Direccion ENDPOINT***//
    static async guardarDireccion(body){
        const response = await axios.post(`${this.BASE_URL}/direccion/guardar`, body, {
            headers: this.getHeader()
        })

        return response.data
    }



    //*** Verificar Autenticacion***//
    static logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("rol")
    }


    static isAuthenticated(){
        const token = localStorage.getItem("token")
        return !!token
    }


    static isAdmin(){
        const rol = localStorage.getItem("rol")
        return rol === 'ADMIN'
    }

}
