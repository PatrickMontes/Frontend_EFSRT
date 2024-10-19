import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/adminProductoAgregar.css'
import ApiService from "../../service/ApiService";

const AdminProductoAgregar = () => {

    const [imagen, setImagen] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [categoriaId, setCategoriaId] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [precio, setPrecio] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        ApiService.getAllCategorias().then((res) => setCategorias(res.listaCategorias));
    }, [])

    const handleImage = (e) => {
        setImagen(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('imagen', imagen);
            formData.append('categoriaId', categoriaId);
            formData.append('nombre', nombre);
            formData.append('descripcion', descripcion);
            formData.append('precio', precio);

            const response = await ApiService.agregarProducto(formData);
            if (response.estado === 200) {
                setMensaje(response.mensaje)
                setTimeout(() => {
                    setMensaje('')
                    navigate('/admin/productos')
                }, 2000);
            }

        } catch (error) {
            setMensaje(error.response?.data?.mensaje || error.mensaje || 'unable to upload product')
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit} className="product-form">
                <h2>Add Product</h2>
                {mensaje && <div className="message">{mensaje}</div>}
                <input type="file" onChange={handleImage} />
                <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} >
                    <option value="">Seleccionar Categoria</option>
                    {categorias.map((cat)=>(
                        <option value={cat.id} key={cat.id}>{cat.nombre}</option>
                    ))}
                </select>
                <input type="text"  placeholder="Nombre de Producto" value={nombre} onChange={(e)=> setNombre(e.target.value)} />

                <textarea  placeholder="Descripcion" value={descripcion} onChange={(e)=> setDescripcion(e.target.value)}/>

                <input type="number"  placeholder="Precio" value={precio} onChange={(e)=> setPrecio(e.target.value)} />

                <button type="submit">AGREGAR</button>
            </form>
        </div>
    )

}
export default AdminProductoAgregar;
