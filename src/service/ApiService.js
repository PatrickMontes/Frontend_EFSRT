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
    


}