import React, { useContext } from 'react';
import { DataContext } from '../hooks/DataContext'; // Importar o DataContext

const ProductDropdown = ({ value, onChange }) => {
    const { products } = useContext(DataContext); // Usar contexto para obter os produtos

    // Função para lidar com a seleção do produto
    const handleProductSelection = (event) => {
        const selectedProduct = products.find(product => product.CodigoProduto === event.target.value);
        onChange(selectedProduct ? selectedProduct.CodigoProduto : ''); // Chama onChange com o Código do Produto
    };

    return (
        <div className="form-group">
            <label htmlFor="productSelect">Selecione um Produto</label>
            <select
                id="productSelect"
                className="form-control"
                value={value || ''}
                onChange={handleProductSelection} // Chama handleProductSelection na seleção de produto
            >
                <option value="" label=''>Selecione um Produto no menu</option>
                {products.map((product, index) => (
                    <option key={index} value={product.CodigoProduto}>
                        {product.CodigoProduto} - {product.NomeProduto}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ProductDropdown;

