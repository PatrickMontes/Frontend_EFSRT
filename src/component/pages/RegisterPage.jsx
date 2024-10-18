import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import '../../style/register.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    numeroTelefono: '',
    contrasena: ''
  });

  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.registrarUsuario(formData);
      if (response.estado === 200) {
        setMessage("Usuario Registrado Satisfactoriamente");
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      }
    } catch (error) {
      setMessage(error.response?.data.mensaje || error.message || "Incapaz de Registrar el Usuario");
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Name: </label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />

        <label>Phone Number: </label>
        <input
          type="text"
          name="numeroTelefono"
          value={formData.numeroTelefono}
          onChange={handleChange}
          required
        />

        <label>Password: </label>
        <input
          type="password"
          name="contrasena"
          value={formData.contrasena}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
        <p className="register-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;