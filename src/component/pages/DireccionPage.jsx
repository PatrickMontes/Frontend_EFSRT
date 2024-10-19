import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService from "../../service/ApiService";
import '../../style/direccionPage.css';

const AddressPage = () => {

    const [direccion, setAddress] = useState({
        calle: '',
        ciudad: '',
        estado: '',
        codigoPostal: '',
        pais: ''
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/editar-direccion') {
            fetchUserInfo();
        }
    }, [location.pathname]);

    const fetchUserInfo = async () => {
        try {
            const response = await ApiService.getUsuarioInfo();
            if (response.usuario.direccion) {
                setAddress(response.usuario.direccion);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message || "Unable to fetch user information");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ApiService.guardarDireccion(direccion);
            navigate("/perfil");
        } catch (error) {
            setError(error.response?.data?.message || error.message || "Failed to save/update address");
        }
    };

    return (
        <div className="address-page">
            <h2>{location.pathname === '/editar-direccion' ? 'Editar Dirección' : "Agregar Dirección"}</h2>
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
                <label>
                    Calle:
                    <input type="text" name="calle" value={direccion.calle} onChange={handleChange} required />
                </label>
                <label>
                    Ciudad:
                    <input type="text" name="ciudad" value={direccion.ciudad} onChange={handleChange} required />
                </label>
                <label>
                    Estado:
                    <input type="text" name="estado" value={direccion.estado} onChange={handleChange} required />
                </label>
                <label>
                    Código Postal:
                    <input type="text" name="codigoPostal" value={direccion.codigoPostal} onChange={handleChange} required />
                </label>
                <label>
                    País:
                    <input type="text" name="pais" value={direccion.pais} onChange={handleChange} required />
                </label>
                <button type="submit">{location.pathname === '/editar-direccion' ? 'Editar' : "AGREGAR"}</button>
            </form>
        </div>
    );
};

export default AddressPage;
