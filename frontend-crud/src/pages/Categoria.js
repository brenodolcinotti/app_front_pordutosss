import React, { useState } from "react";
import "../styles/Form.css"; // Mantendo a importação do CSS

function Categoria() {
    const [categoria, setCategoria] = useState({
        nome: ""
    });
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("");

    const handleChange = (e) => {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // A Lógica de validação e o endpoint (porta) foram mantidos.
        if (!categoria.nome.trim()) {
            mostrarMensagem("Nome da categoria é obrigatório", "erro");
            return;
        }

        try {
            // PORTA MANTIDA: http://localhost:4567/categorias
            const response = await fetch("http://localhost:4567/categorias", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(categoria),
            });

            if (response.ok) {
                const novaCategoria = await response.json();
                mostrarMensagem(`Categoria "${novaCategoria.nome}" criada com sucesso!`, "sucesso");
                // Limpar formulário
                setCategoria({ nome: "" });
            } else {
                const erro = await response.json();
                mostrarMensagem(erro.mensagem || "Erro ao criar categoria", "erro");
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
            <h2>Cadastrar Nova Categoria 🏷️</h2>
            
            <form onSubmit={handleSubmit} className="form">
                {/* 🔄 ORDEM ALTERADA: A mensagem de feedback foi movida para DENTRO do <form> e acima do input. */}
                {mensagem && (
                    <div className={`mensagem ${tipoMensagem}`}>
                        {mensagem}
                    </div>
                )}
                
                <div className="form-group">
                    <label htmlFor="nome">Nome da Categoria *</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={categoria.nome}
                        onChange={handleChange}
                        placeholder="Ex: Alimentos, Eletrônicos, Roupas"
                        required
                    />
                </div>

                <button type="submit" className="btn-submit">
                    💾 Cadastrar Categoria
                </button>
            </form>
        </div>
    );
}

export default Categoria;