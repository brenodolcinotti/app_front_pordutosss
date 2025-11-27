import React, { useState, useEffect, useCallback } from 'react';
import { ProductService } from '../services/apiService';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import './Pages.css';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null); // Produto sendo editado
    const [searchId, setSearchId] = useState(''); // ID para busca individual

    // GET: Carregar todos os produtos
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await ProductService.findAll();
            // Garante que 'data' é um array, senão assume array vazio
            setProducts(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(`Falha ao carregar produtos: ${err.message}`);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // POST/PUT: Lógica para Salvar (Criar ou Atualizar)
    const handleSave = async (productData) => {
        setError(null);
        try {
            if (editingProduct) {
                // PUT: Atualizar
                await ProductService.update(editingProduct.id, productData);
                alert('Produto atualizado com sucesso!');
            } else {
                // POST: Criar
                await ProductService.create(productData);
                alert('Produto criado com sucesso!');
            }
            // Resetar estado e recarregar lista
            setEditingProduct(null);
            fetchProducts();
        } catch (err) {
            setError(`Falha ao salvar produto: ${err.message}`);
        }
    };

    // DELETE: Lógica para Excluir
    const handleDelete = async (id) => {
        if (!window.confirm(`Tem certeza que deseja excluir o Produto ID ${id}? (Operação DELETE)`)) return;
        setError(null);
        try {
            await ProductService.remove(id);
            alert(`Produto ID ${id} excluído com sucesso!`);
            fetchProducts(); // Recarregar lista
        } catch (err) {
            setError(`Falha ao excluir produto: ${err.message}`);
        }
    };

    // GET Individual: Buscar por ID
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchId) {
            alert('Por favor, digite um ID para buscar.');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const product = await ProductService.findById(searchId);
            setProducts([product]); // Exibe apenas o produto encontrado
            alert(`Busca individual (GET) concluída para ID ${searchId}.`);
        } catch (err) {
            setError(`Busca falhou: ${err.message}`);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>Gerenciamento de Produtos (CRUD)</h1>
           
            {/* Componente de Criação/Atualização */}
            <ProductForm
                initialData={editingProduct}
                onSave={handleSave}
                onCancel={() => setEditingProduct(null)}
            />
           
            <hr />

            {/* Interface de Busca por ID e Listagem Geral */}
            <div className="crud-controls">
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="number"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        placeholder="Buscar Produto por ID (GET individual)"
                        min="1"
                    />
                    <button type="submit">Buscar por ID</button>
                </form>
                <button type="button" onClick={() => { fetchProducts(); setSearchId(''); }}>Listar Todos (GET)</button>
            </div>

            {error && <p className="error">{error}</p>}
            {loading ? (
                <p>Carregando dados do Back-End...</p>
            ) : (
                <ProductList
                    products={products}
                    onEdit={setEditingProduct}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default ProductsPage;