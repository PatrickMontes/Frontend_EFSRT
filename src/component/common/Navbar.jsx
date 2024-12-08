import React, { useState } from "react";
import '../../style/navbar.css';
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import Swal from "sweetalert2"; // Importa SweetAlert2

const Navbar =  () => {
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const isAdmin = ApiService.isAdmin();
    const isAuthenticated = ApiService.isAuthenticated();

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchValue.trim()) {
            navigate(`/?search=${encodeURIComponent(searchValue)}`);
        }
    };

    const handleLogout = () => {
        Swal.fire({
            title: "¿Estás segura de que quieres cerrar sesión?",
            icon: "warning", // Tipo de alerta (puedes usar "info", "success", "error", etc.)
            showCancelButton: true,
            confirmButtonText: "Sí, cerrar sesión",
            cancelButtonText: "Cancelar",
            reverseButtons: true, // Cambiar el orden de los botones
            customClass: {
                confirmButton: 'swal-btn-confirm',
                cancelButton: 'swal-btn-cancel'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                ApiService.logout();
                setTimeout(() => {
                    navigate('/login');
                }, 500);
            }
        });
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/"> <img src="./mass-logo.png" alt="Tiendas Mass" /> </NavLink>
            </div>

            {/* SEARCH FORM */}
            <form className="navbar-serch" onSubmit={handleSearchSubmit}>
                <input type="text" placeholder="Buscar productos" value={searchValue} onChange={handleSearchChange} />
                <button type="submit"><img src="./icono-busqueda.svg" alt="Search" /></button>
            </form>

            <div className="navbar-link">
                {!isAdmin && <NavLink to="/" activeClassName="active">Inicio</NavLink>}
                {!isAdmin && <NavLink to="/categorias" activeClassName="active">Categorias</NavLink>}
                {isAuthenticated && <NavLink to="/perfil" activeClassName="active">Perfil</NavLink>}
                {isAdmin && <NavLink to="/admin/categorias" activeClassName="active">Categorias</NavLink>}
                {isAdmin && <NavLink to="/admin/productos" activeClassName="active">Productos</NavLink>}
                {isAdmin && <NavLink to="/admin/pedidos" activeClassName="active">Pedidos</NavLink>}
                {!isAuthenticated && <NavLink to="/login" activeClassName="active">Login</NavLink>}
                {isAuthenticated && <NavLink onClick={handleLogout}>Logout</NavLink>}
                {!isAdmin && <NavLink to="/carrito">Carrito</NavLink>}
            </div>
        </nav>
    );
}

export default Navbar;
