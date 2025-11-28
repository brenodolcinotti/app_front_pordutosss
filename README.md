Alice Prado e Silva 
Breno Dolcinotti

*Sistema de Gerenciamento de Produtos e Categorias*

Aplicação completa com interface web moderna para cadastrar, listar, editar e excluir produtos e categorias.

*Requisitos Necessários*
Antes de começar, certifique-se de que os seguintes programas estão instalados no seu computador:

-Node.js (versão 14 ou superior)
-Java JDK 8 ou superior

*MySQL*

Uma IDE para Java (Eclipse, IntelliJ, VS Code etc.)

1. Ajustar a Conexão com o Banco de Dados

No arquivo ConnectionFactory.java, atualize a senha do MySQL:

private static final String PASS = "sua-senha-do-mysql"; // Insira sua senha aqui

*Código do banco de dados*

-- ===================================================================
-- Script de criação do banco de dados aulajdbc
-- Autor: André Roberto da Silva
-- Descrição: Cria as tabelas 'categorias' e 'produtos' e insere dados
-- ===================================================================
-- Criar o banco de dados
SET NAMES 'utf8mb4';
CREATE DATABASE IF NOT EXISTS aulajdbc;
USE aulajdbc;

-- ===================================================================
-- Tabela: categorias
-- ===================================================================
CREATE TABLE IF NOT EXISTS categorias (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL
);

-- Inserir registros iniciais em categorias
INSERT INTO categorias (nome) VALUES 
('Eletrônicos'),
('Livros'),
('Alimentos');

-- ===================================================================
-- Tabela: produtos
-- ===================================================================
CREATE TABLE IF NOT EXISTS produtos (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    preco DOUBLE NOT NULL,
    estoque INT NOT NULL,
    id_categoria BIGINT,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id)
);

-- Inserir registros iniciais em produtos
INSERT INTO produtos (nome, preco, estoque, id_categoria) VALUES
('Smartphone Samsung Galaxy A15', 1299.90, 25, 1),
('Notebook Dell Inspiron 15', 3899.00, 10, 1),
('Fone de Ouvido Bluetooth JBL', 349.50, 50, 1),
('Monitor LG 24"', 899.00, 15, 1),
('O Senhor dos Anéis', 79.90, 30, 2),
('Clean Code', 149.00, 20, 2),
('A Arte da Guerra', 39.90, 40, 2),
('Dom Casmurro', 29.90, 35, 2),
('Arroz Tipo 1 - 5kg', 23.50, 100, 3),
('Feijão Carioca - 1kg', 8.90, 120, 3),
('Azeite de Oliva Extra Virgem', 34.90, 45, 3),
('Chocolate ao Leite 100g', 6.50, 80, 3);

*Back-end*

2. Iniciar o Backend (API em Java)

No seu ambiente de desenvolvimento:

-Abra o projeto Java.
Vá até: src/api/ApiProduto.java

-Clique com o botão direito nesse arquivo.
Escolha Run Java (ou similar).

-Após isso, o backend:

Será iniciado na porta 4567

Vai mostrar no console:
"API de Produtos iniciada na porta 4567"

Ficará ativo aguardando chamadas do frontend.

3. Iniciar o Frontend (React)

Em um terminal separado:

-Acesse a pasta do frontend:
cd frontend-crud

-Instale as dependências do projeto (apenas na primeira execução):
npm install


-Inicie a aplicação:
npm start

O frontend irá:

-Executar na porta 3000
-Abrir automaticamente no navegador
-Mostrar a página inicial do sistema
-Acessando o Sistema

Abra no navegador:
 http://localhost:3000