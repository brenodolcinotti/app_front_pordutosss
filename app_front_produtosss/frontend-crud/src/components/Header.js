import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="app-header">
            <nav>
                <Link to="/categorias">Categorias</Link>
                <Link to="/produtos">Produtos</Link>
            </nav>
        </header>
    );
};

export default Header;