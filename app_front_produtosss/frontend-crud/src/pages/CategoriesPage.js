import React, { useState, useEffect } from 'react';
import { CategoryService } from '../services/apiService';
import CategoryList from '../components/CategoryList';
import CategoryForm from '../components/CategoryForm';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingCategory, setEditingCategory] = useState(null); // Para o modo PUT
    const [searchId, setSearchId] = useState(''); // Para a busca por ID (GET individual)

    // GET: Carregar todas as categorias
    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await CategoryService.findAll();
            setCategories(Array.isArray(data) ? data : []);
        } catch (err) {
            setError('Falha ao carregar categorias.');
            setCategories([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // POST/PUT: Lógica para Salvar (Criar ou Atualizar)
    const handleSave = async (categoryData) => {
        setError(null);
        try {
            if (editingCategory) {
                // PUT: Atualizar
                await CategoryService.update(editingCategory.id, categoryData);
                alert('Categoria atualizada com sucesso!');
            } else {
                // POST: Criar
                await CategoryService.create(categoryData);
                alert('Categoria criada com sucesso!');
            }
            // Resetar estado e recarregar lista
            setEditingCategory(null);
            fetchCategories();
        } catch (err) {
            setError(`Falha ao salvar categoria: ${err.message}`);
        }
    };

    // DELETE: Lógica para Excluir
    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir esta categoria?')) return;
        setError(null);
        try {
            await CategoryService.remove(id);
            alert('Categoria excluída com sucesso!');
            fetchCategories(); // Recarregar lista
        } catch (err) {
            setError(`Falha ao excluir categoria: ${err.message}`);
        }
    };

    // GET Individual: Buscar por ID
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchId) return;

        setLoading(true);
        setError(null);
        try {
            const category = await CategoryService.findById(searchId);
            setCategories([category]); // Mostrar apenas o resultado da busca
            alert('Busca individual concluída. Clique em "Listar Todos" para voltar.');
        } catch (err) {
            setError(`Categoria com ID ${searchId} não encontrada.`);
            setCategories([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>Gerenciamento de Categorias</h2>

            {/* Formulário de Criação/Atualização */}
            <CategoryForm
                initialData={editingCategory}
                onSave={handleSave}
                onCancel={() => setEditingCategory(null)}
            />
           
            <hr />

            {/* Interface de Busca por ID */}
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="number"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Buscar Categoria por ID"
                    min="1"
                />
                <button type="submit">Buscar por ID (GET)</button>
                <button type="button" onClick={fetchCategories}>Listar Todos (GET)</button>
            </form>

            {error && <p className="error">{error}</p>}
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <CategoryList
                    categories={categories}
                    onEdit={setEditingCategory}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default CategoriesPage;