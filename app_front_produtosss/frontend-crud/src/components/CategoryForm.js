import React, { useState, useEffect } from 'react';

const CategoryForm = ({ initialData, onSave, onCancel }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
            setDescription(initialData.description || '');
        } else {
            setName('');
            setDescription('');
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSave = {
            name,
            description
        };
       
        onSave(dataToSave);
    };

    return (
        <div className="form-container">
            <h3>{initialData ? 'Atualizar Categoria (PUT)' : 'Criar Nova Categoria (POST)'}</h3>
            <form onSubmit={handleSubmit}>
                {/* Campo Nome */}
                <input
                    type="text"
                    placeholder="Nome da Categoria"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                {/* Campo Descrição */}
                <textarea
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
               
                <button type="submit">{initialData ? 'Atualizar' : 'Criar'}</button>
                {initialData && (
                    <button type="button" onClick={onCancel} className="cancel-btn">
                        Cancelar Edição
                    </button>
                )}
            </form>
        </div>
    );
};

export default CategoryForm;