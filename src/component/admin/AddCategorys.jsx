import React , {useState} from 'react'
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const AddCategorys = () => {
    const [nombre, setNombre] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.crearCategoria({nombre});
            if (response.estado === 200) {
                setMessage(response.message);
                setTimeout(()=>{
                    setMessage('');
                    navigate("/admin/categories")
                }, 1000)
            }
        } catch (error) {
            setMessage(error.response?.data?.mensaje || error.message || "Failed to save a category")
        }
    }

    return(
        <div className="add-category-page">
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} className="category-form">
                <h2>Add Category</h2>
                <input type="text"
                placeholder="Category Name"
                value={nombre}
                onChange={(e)=> setNombre(e.target.value)} />

                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default AddCategorys;