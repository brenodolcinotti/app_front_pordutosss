const API_BASE_URL = 'http://localhost:8080/api/v1';

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(error.message || `Erro HTTP: ${response.status}`);
    }
    // Retorna JSON, ou null se a resposta for 204 No Content (DELETE)
    return response.status !== 204 ? response.json() : null;
};

// Funções Genéricas de Requisição

const request = async (endpoint, method = 'GET', data = null) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);
        return handleResponse(response);
    } catch (error) {
        console.error(`Erro na requisição ${method} para ${endpoint}:`, error);
        throw error;
    }
};

// Funções Específicas para CRUD de Categorias

export const CategoryService = {
    // GET: Listar todos
    findAll: () => request('/categorias'),
   
    // GET: Buscar por ID
    findById: (id) => request(`/categorias/${id}`),

    // POST: Criar
    create: (categoryData) => request('/categorias', 'POST', categoryData),

    // PUT: Atualizar
    update: (id, categoryData) => request(`/categorias/${id}`, 'PUT', categoryData),

    // DELETE: Remover
    remove: (id) => request(`/categorias/${id}`, 'DELETE'),
};

// Funções Específicas para CRUD de Produtos

export const ProductService = {
    // GET: Listar todos
    findAll: () => request('/produtos'),
   
    // GET: Buscar por ID
    findById: (id) => request(`/produtos/${id}`),

    // POST: Criar
    create: (productData) => request('/produtos', 'POST', productData),

    // PUT: Atualizar
    update: (id, productData) => request(`/produtos/${id}`, 'PUT', productData),

    // DELETE: Remover
    remove: (id) => request(`/produtos/${id}`, 'DELETE'),
};