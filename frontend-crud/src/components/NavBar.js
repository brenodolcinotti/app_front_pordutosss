import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

function NavBar(){
    return(
        <nav className="navbar">
            {/* Título do Sistema */}
            <h1>
                 Sistema de Gestão de Estoque
            </h1>
            
            {/* Lista de Links */}
            <ul className="nav-links">
                
                {/* 2. Listagem (Gerenciamento) */}
                <li>
                    <Link to="/listar">Gerenciar Produtos/Categorias</Link>
                </li>
                
                {/* 3. Inserir Produto */}
                <li>
                    <Link to="/produto">Novo Produto</Link>
                </li>
                
                {/* 4. Inserir Categoria */}
                <li>
                    <Link to="/categoria">Nova Categoria</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;