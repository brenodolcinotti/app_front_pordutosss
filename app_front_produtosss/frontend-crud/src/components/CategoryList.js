import React from 'react';

const CategoryList = ({ categories, onEdit, onDelete }) => {
    return (
        <div className="list-container">
            <h3>Lista de Categorias ({categories.length} registro(s))</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>
                                <button onClick={() => onEdit(category)}>Editar (PUT)</button>
                                <button onClick={() => onDelete(category.id)} className="delete-btn">Excluir (DELETE)</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;