import { useLocation } from 'react-router-dom';

const SearchResultsPage = () => {
    const location = useLocation();
    const { results } = location.state || {};

    return (
        <div>
            <h1>Resultados de Búsqueda</h1>
            {results && results.length > 0 ? (
                <ul>
                    {results.map(product => (
                        <li key={product.id}>{product.nombre}</li>
                    ))}
                </ul>
            ) : (
                <p>No se encontraron resultados.</p>
            )}
        </div>
    );
}

export default SearchResultsPage;
