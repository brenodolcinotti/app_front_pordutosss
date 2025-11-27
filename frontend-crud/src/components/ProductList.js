import React from 'react';

const ProductList = ({ products, onEdit, onDelete }) => {
    return (
        <div className="list-container">
            <h3>Lista de Produtos ({products.length} registro(s))</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Estoque</th>
                        <th>Ações CRUD</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.nome}</td>
                            <td>R$ {product.preco ? product.preco.toFixed(2) : '0.00'}</td>
                            <td>{product.estoque}</td>
                            <td>
                                <button onClick={() => onEdit(product)}>Editar (PUT)</button>
                                <button onClick={() => onDelete(product.id)} className="delete-btn">Excluir (DELETE)</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;