import React, { useState, useContext } from 'react';
import { DataContext } from '../hooks/DataContext'; // Importar o DataContext

const ProductDropdown = () => {
    const [selectedProduct, setSelectedProduct] = useState('');
    const { products } = useContext(DataContext); // Usar contexto para obter os produtos

    // Função para lidar com a seleção do produto
    const handleProductSelection = (selectedProduct) => {
        setSelectedProduct(selectedProduct);
        // Produto selecionado armazenado em 'selectedProduct' para uso posterior
        console.log('Produto selecionado:', selectedProduct);
    };

    return (
        <div className="form-group">
            <label htmlFor="productSelect"></label>
            <select
                id="productSelect"
                className="form-control"
                value={selectedProduct.CodigoProduto || ''}
                onChange={(e) => {
                    const selectedProduct = products.find(product => product.CodigoProduto === e.target.value);
                    handleProductSelection(selectedProduct);
                }} // Chama handleProductSelection na seleção de produto
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
