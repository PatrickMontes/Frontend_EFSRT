import React, {useState} from "react";
import '../../style/navbar.css';
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const Navbar =  () => {
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const isAdmin = ApiService.isAdmin();
    const isAuthenticated = ApiService.isAuthenticated();

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    }

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        navigate(`/?search=${searchValue}`)
    }

    const handleLogout = () => {
        const confirm = window.confirm("¿Estás segura de que quieres cerrar sesión?");
        if(confirm){
            ApiService.logout();
            setTimeout(()=>{
                navigate('/login')
            }, 500);
        }
    }


    return(
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/"> <img src="./mass-logo.png" alt="Tiendas Mass" /> </NavLink>
            </div>

            {/= SEARCH FORM =/}
            <form className="navbar-serch" onSubmit={handleSearchSubmit}>
                <input type="text" placeholder="Buscar productos" value={searchValue} onChange={handleSearchChange}/>
                <button type="submit">Buscar</button>
            </form>

            <div className="navbar-link">
                <NavLink to="/" activeClassname="active">Home</NavLink>
                <NavLink to="/categorias" activeClassname="active">Categorias</NavLink>
                {isAuthenticated && <NavLink to="/perfil" activeClassname="active">Mi cuenta</NavLink>}
                {isAdmin && <NavLink to="/admin" activeClassname="active">Admin</NavLink>}
                {!isAuthenticated && <NavLink to="/login" activeClassname="active">Login</NavLink>}
                {isAuthenticated && <NavLink onClick={handleLogout}>Logout</NavLink>}
                <NavLink to="/carrito">Carrito</NavLink>
            </div>
        </nav>
    )
}

export default Navbar;