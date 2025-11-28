import React, { useState, useEffect } from "react";
import "../styles/Form.css"; // Mantendo a importação do CSS

function Produto() {
    const [produto, setProduto] = useState({
        nome: "",
        preco: "",
        estoque: "",
        categoria: { id: "" }
    });
    const [categorias, setCategorias] = useState([]);
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("");

    // Buscar categorias ao carregar o componente
    useEffect(() => {
        buscarCategorias();
    }, []);

    const buscarCategorias = async () => {
        try {
            // PORTA MANTIDA
            const response = await fetch("http://localhost:4567/categorias");
            if (response.ok) {
                const data = await response.json();
                setCategorias(data);
            } else {
                mostrarMensagem("Erro ao carregar categorias", "erro");
            }
        } catch (error) {
            console.error("Erro:", error);
            mostrarMensagem("Erro de conexão com o servidor", "erro");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "categoriaId") {
            setProduto({
                ...produto,
                categoria: { id: value || null }
            });
        } else {
            setProduto({
                ...produto,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validação básica
        if (!produto.nome || !produto.preco) {
            mostrarMensagem("Nome e preço são obrigatórios", "erro");
            return;
        }

        const produtoData = {
            nome: produto.nome,
            preco: parseFloat(produto.preco),
            estoque: parseInt(produto.estoque) || 0,
            categoria: produto.categoria.id ? { id: parseInt(produto.categoria.id) } : null
        };

        try {
            // PORTA MANTIDA
            const response = await fetch("http://localhost:4567/produtos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(produtoData),
            });

            if (response.ok) {
                const novoProduto = await response.json();
                mostrarMensagem(`Produto "${novoProduto.nome}" criado com sucesso!`, "sucesso");
                // Limpar formulário
                setProduto({
                    nome: "",
                    preco: "",
                    estoque: "",
                    categoria: { id: "" }
                });
            } else {
                const erro = await response.json();
                mostrarMensagem(erro.mensagem || "Erro ao criar produto", "erro");
            }
        } catch (error) {
            console.error("Erro:", error);
            mostrarMensagem("Erro de conexão com o servidor", "erro");
        }
    };

    const mostrarMensagem = (msg, tipo) => {
        setMensagem(msg);
        setTipoMensagem(tipo);
        setTimeout(() => {
            setMensagem("");
            setTipoMensagem("");
        }, 5000);
    };

    return (
        <div className="form-container">
            <h2>Cadastrar Novo Produto 🛒</h2>
            
            <form onSubmit={handleSubmit} className="form">
                
                {/* 🔄 ORDEM ALTERADA: A mensagem de feedback foi movida para DENTRO do <form>. */}
                {mensagem && (
                    <div className={`mensagem ${tipoMensagem}`}>
                        {mensagem}
                    </div>
                )}
                
                {/* Campo Nome do Produto */}
                <div className="form-group full-width">
                    <label htmlFor="nome">Nome do Produto *</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={produto.nome}
                        onChange={handleChange}
                        placeholder="Ex: Notebook Gamer"
                        required
                    />
                </div>

                <div className="form-group-row"> {/* Nova div para agrupar campos lado a lado */}
                    
                    {/* 🔄 ORDEM ALTERADA: Estoque está antes de Preço */}
                    <div className="form-group half-width">
                        <label htmlFor="estoque">Estoque</label>
                        <input
                            type="number"
                            id="estoque"
                            name="estoque"
                            min="0"
                            value={produto.estoque}
                            onChange={handleChange}
                            placeholder="0"
                        />
                    </div>

                    {/* Campo Preço */}
                    <div className="form-group half-width">
                        <label htmlFor="preco">Preço *</label>
                        <input
                            type="number"
                            id="preco"
                            name="preco"
                            step="0.01"
                            min="0"
                            value={produto.preco}
                            onChange={handleChange}
                            placeholder="0.00"
                            required
                        />
                    </div>
                </div>


                {/* Campo Categoria */}
                <div className="form-group full-width">
                    <label htmlFor="categoriaId">Categoria</label>
                    <select
                        id="categoriaId"
                        name="categoriaId"
                        value={produto.categoria.id}
                        onChange={handleChange}
                    >
                        <option value="">Selecione uma categoria</option>
                        {categorias.map(categoria => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn-submit">
                    ➕ Cadastrar Produto
                </button>
            </form>
        </div>
    );
}

export default Produto;