import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../../style/adminProductoAgregar.css';
import ApiService from "../../service/ApiService";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminProductoEditar = () => {
    const { productoId } = useParams();
    const [imagen, setImagen] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [categoriaId, setCategoriaId] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [precio, setPrecio] = useState('');
    const [urlImagen, setUrlImagen] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        ApiService.getAllCategorias().then((res) => setCategorias(res.listaCategorias));

        if (productoId) {
            ApiService.getAllProductosPorId(productoId).then((response) => {
                setNombre(response.producto.nombre);
                setDescripcion(response.producto.descripcion);
                setPrecio(response.producto.precio);
                setCategoriaId(response.producto.categoriaId);
                setUrlImagen(response.producto.urlImagen);
            });
        }
    }, [productoId]);

    const handleImageChange = (e) => {
        setImagen(e.target.files[0]);
        setUrlImagen(URL.createObjectURL(e.target.files[0]));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            if (imagen) {
                formData.append('imagen', imagen);
            }
            formData.append('productoId', productoId); 
            formData.append('categoriaId', categoriaId);
            formData.append('nombre', nombre);
            formData.append('descripcion', descripcion);
            formData.append('precio', precio);

            const response = await ApiService.actualizarProducto(formData);
            if (response.estado === 200) {
                setMensaje(response.mensaje);
                toast.success('Producto actualizado exitosamente');
                setTimeout(() => {
                    setMensaje('');
                    navigate('/admin/productos');
                }, 2000);
            }

        } catch (error) {
            setMensaje(error.response?.data?.mensaje || error.message || 'Error al actualizar Producto');
            toast.error('Error al actualizar el producto');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="product-form">
                <h2>Editar Producto</h2>
                {mensaje && <div className="message">{mensaje}</div>}
                <input type="file" onChange={handleImageChange} />
                {urlImagen && <img src={urlImagen} alt={nombre} />}
                <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
                    <option value="">Seleccionar Categoria</option>
                    {categorias.map((cat) => (
                        <option value={cat.id} key={cat.id}>{cat.nombre}</option>
                    ))}
                </select>

                <input type="text" placeholder="Nombre de Producto" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <input placeholder="Descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                <input type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                <button type="submit">EDITAR</button>
            </form>
            <ToastContainer />
        </>
    );
}

export default AdminProductoEditar;
