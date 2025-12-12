import React, { useState, useEffect } from "react";
import "../styles/Form.css";

function Produto() {
    const [produto, setProduto] = useState({
        nome: "",
        preco: "",
        estoque: "",
        categoriaId: ""  // usado no select
    });

    const [categorias, setCategorias] = useState([]);
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("");

    // Buscar categorias
    useEffect(() => {
        buscarCategorias();
    }, []);

    const buscarCategorias = async () => {
        try {
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

    // Atualiza campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;

        setProduto((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!produto.nome || !produto.preco) {
            mostrarMensagem("Nome e preço são obrigatórios", "erro");
            return;
        }

        // Formato correto que sua API usa
        const produtoData = {
            nome: produto.nome,
            preco: parseFloat(produto.preco),
            estoque: parseInt(produto.estoque) || 0,
            categoriaId: parseInt(produto.categoriaId) || null
        };

        console.log("Enviando para API:", produtoData);

        try {
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

                // limpar formulário
                setProduto({
                    nome: "",
                    preco: "",
                    estoque: "",
                    categoriaId: ""
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

                {mensagem && (
                    <div className={`mensagem ${tipoMensagem}`}>
                        {mensagem}
                    </div>
                )}

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

                <div className="form-group-row">
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

                {/* SELECT corrigido */}
                <div className="form-group full-width">
                    <label htmlFor="categoriaId">Categoria</label>
                    <select
                        id="categoriaId"
                        name="categoriaId"
                        value={produto.categoriaId}
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
