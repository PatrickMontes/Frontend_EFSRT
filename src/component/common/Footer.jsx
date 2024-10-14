import React from "react";
import '../../style/footer.css';
import { NavLink } from "react-router-dom";

const Footer = () => {

    return (
        <footer className="footer">
            <div className="footer-links">
                <ul>
                    <NavLink to={"/"}>About Us</NavLink>
                    <NavLink to={"/"}>Contact Us</NavLink>
                    <NavLink to={"/"}>Terms & Conditions</NavLink>
                    <NavLink to={"/"}>Privacy Policy</NavLink>
                    <NavLink to={"/"}>FAQS</NavLink>
                </ul>
            </div>
            <div className="footer-info">
                <p>&copy; Tiendas Mass 2024 
                    Compañía Hard Discount S.A.C </p>
            </div>
        </footer>
    )

}

export default Footer;