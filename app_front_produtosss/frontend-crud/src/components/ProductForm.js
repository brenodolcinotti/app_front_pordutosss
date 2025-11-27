import React, { useState, useEffect } from 'react';

const ProductForm = ({ initialData, onSave, onCancel }) => {
    // Mapeamento dos campos do modelo 'Produto' do seu Back-End
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState(0);
    const [estoque, setEstoque] = useState(0);
    const isEditing = !!initialData;

    useEffect(() => {
        if (initialData) {
            setNome(initialData.nome || '');
            setPreco(initialData.preco || 0);
            setEstoque(initialData.estoque || 0);
        } else {
            setNome('');
            setPreco(0);
            setEstoque(0);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
       
        // Estrutura de dados esperada pelo Back-End (ApiProduto.java)
        const dataToSave = {
            nome,
            preco: parseFloat(preco), // Garante que é um número para o Double do Java
            estoque: parseInt(estoque, 10) // Garante que é um inteiro para o Int do Java
        };
       
        onSave(dataToSave);
    };

    return (
        <div className="form-container">
            <h3>{isEditing ? `Atualizar Produto ID: ${initialData.id} (PUT)` : 'Criar Novo Produto (POST)'}</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Preço:
                    <input
                        type="number"
                        step="0.01"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Estoque:
                    <input
                        type="number"
                        value={estoque}
                        onChange={(e) => setEstoque(e.target.value)}
                        required
                    />
                </label>
               
                <button type="submit">{isEditing ? 'Salvar Alterações' : 'Criar Produto'}</button>
                {isEditing && (
                    <button type="button" onClick={onCancel} className="cancel-btn">
                        Cancelar Edição
                    </button>
                )}
            </form>
        </div>
    );
};

export default ProductForm;