import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoriesPage from './pages/CategoriesPage';
import ProductsPage from './pages/ProductsPage';
import Header from './components/Header'; // Componente de navegação

const App = () => {
    return (
        <Router>
            <Header /> {/* Inclui a navegação */}
            <div className="main-content">
                <Routes>
                    {/* Rota padrão para categorias */}
                    <Route path="/" element={<CategoriesPage />} />
                    <Route path="/categorias" element={<CategoriesPage />} />
                    {/* Rota para produtos */}
                    <Route path="/produtos" element={<ProductsPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;