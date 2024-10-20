import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import '../../style/register.css'


const LoginPage = () => {

    const [formData, setFormData] = useState({
        email: '',
        contrasena: ''
    });

    const [message, setMessage] = useState(null);
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
                setMessage("Usuario iniciada exitosamente");
                localStorage.setItem('token', response.token); 
                localStorage.setItem('rol', response.rol);   
                navigate("/perfil"); 
            }
        } catch (error) {
            console.error("Error durante el inicio de sesión:", error);
            const errorMessage = error.response?.data?.mensaje || error.message || "No se puede iniciar sesión una usuario";
            setMessage(errorMessage);
        }
    }

    return (
        <div className="register-page">
            <h2>Login</h2>
            {message && <p className="message">{message}</p>}
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
        </div>
    )
}

export default LoginPage;