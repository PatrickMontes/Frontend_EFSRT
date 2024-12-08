import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { toast, ToastContainer } from "react-toastify"; // Importa toast y ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Estilos de react-toastify
import '../../style/register.css';

const LoginPage = () => {

    const [formData, setFormData] = useState({
        email: '',
        contrasena: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.loginUsuario(formData);
            console.log("Respuesta del servidor:", response); 
            if (response.estado === 200) { 
                toast.success("Usuario iniciado exitosamente"); // Muestra el toast de éxito
                localStorage.setItem('token', response.token); 
                localStorage.setItem('rol', response.rol);   
                navigate("/perfil"); 
            }
        } catch (error) {
            console.error("Error durante el inicio de sesión:", error);
            const errorMessage = error.response?.data?.mensaje || error.message || "No se puede iniciar sesión un usuario";
            toast.error(errorMessage); // Muestra el toast de error
        }
    }

    return (
        <div className="register-page">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Email: </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required />
                    
                <label>Password: </label>
                <input
                    type="password"
                    name="contrasena"
                    value={formData.contrasena}
                    onChange={handleChange}
                    required />

                <button type="submit">Login</button>
                
                <p className="register-link">
                    ¿No tienes una cuenta? <a href="/register">Register</a>
                </p>
            </form>

            {/* Este contenedor es necesario para que se muestren las notificaciones */}
            <ToastContainer />
        </div>
    );
}

export default LoginPage;
