# Documentacao para Notion - Swagger + CRUD

## 1) Visao geral da solucao

Aplicacao distribuida para planejamento de rotas de entrega, com arquitetura:

- Microfrontend (React)
- BFF (Node.js/Express)
- Microservico de Produtos (MongoDB Atlas)
- Microservico de Pedidos (Azure SQL)
- Azure Function (HTTP Trigger)

Fluxo principal:

1. Usuario interage com o microfrontend
2. Frontend chama somente o BFF
3. BFF consulta microservicos e function
4. BFF retorna resposta agregada

---

## 2) Swagger disponivel

### Microservico de Produtos (MongoDB)

- URL local: `http://localhost:4001/docs`
- OpenAPI: 3.0.0
- Contem:
  - schema `ProductInput`
  - schema `Product`
  - schema `ErrorResponse`
  - endpoints de health e CRUD completo

### Microservico de Pedidos (Azure SQL)

- URL local: `http://localhost:4002/docs`
- OpenAPI basico disponivel para consulta

---

## 3) CRUD implementado - Produtos (MongoDB)

Base URL local: `http://localhost:4001`

### 3.1 Health check

**GET** `/health`

Resposta 200:

```json
{
  "service": "products",
  "status": "ok"
}
```

### 3.2 Listar produtos

**GET** `/products`

Resposta 200:

```json
[
  {
    "_id": "6632cf3a72f4d2f8e1094f01",
    "name": "Notebook Dell",
    "weightKg": 2.5,
    "destination": "Curitiba - PR",
    "createdAt": "2026-05-01T20:00:00.000Z",
    "updatedAt": "2026-05-01T20:00:00.000Z"
  }
]
```

### 3.3 Buscar produto por id

**GET** `/products/:id`

Resposta 200:

```json
{
  "_id": "6632cf3a72f4d2f8e1094f01",
  "name": "Notebook Dell",
  "weightKg": 2.5,
  "destination": "Curitiba - PR",
  "createdAt": "2026-05-01T20:00:00.000Z",
  "updatedAt": "2026-05-01T20:00:00.000Z"
}
```

Resposta 404:

```json
{
  "error": "Not found"
}
```

### 3.4 Criar produto

**POST** `/products`

Body:

```json
{
  "name": "Capacete",
  "weightKg": 1.2,
  "destination": "Sao Jose dos Pinhais - PR"
}
```

Resposta 201:

```json
{
  "_id": "6632cf3a72f4d2f8e1094f02",
  "name": "Capacete",
  "weightKg": 1.2,
  "destination": "Sao Jose dos Pinhais - PR",
  "createdAt": "2026-05-01T20:05:00.000Z",
  "updatedAt": "2026-05-01T20:05:00.000Z"
}
```

### 3.5 Atualizar produto

**PUT** `/products/:id`

Body:

```json
{
  "name": "Capacete Pro",
  "weightKg": 1.3,
  "destination": "Curitiba - PR"
}
```

Resposta 200:

```json
{
  "_id": "6632cf3a72f4d2f8e1094f02",
  "name": "Capacete Pro",
  "weightKg": 1.3,
  "destination": "Curitiba - PR",
  "createdAt": "2026-05-01T20:05:00.000Z",
  "updatedAt": "2026-05-01T20:10:00.000Z"
}
```

### 3.6 Excluir produto

**DELETE** `/products/:id`

Resposta 204 (sem body)

---

## 4) CRUD implementado - Pedidos via BFF (para tela admin)

Observacao: o microfrontend **nao acessa ms-orders diretamente**.  
A tela Admin Pedidos usa rotas do BFF.

Base URL local: `http://localhost:4000`

### 4.1 Listar pedidos

**GET** `/admin/orders`

### 4.2 Buscar pedido por id

**GET** `/admin/orders/:id`

### 4.3 Criar pedido

**POST** `/admin/orders`

Body:

```json
{
  "customerName": "Maria Silva",
  "destination": "Curitiba - PR",
  "status": "pending"
}
```

### 4.4 Atualizar pedido

**PUT** `/admin/orders/:id`

Body:

```json
{
  "customerName": "Maria Silva",
  "destination": "Pinhais - PR",
  "status": "in_progress"
}
```

### 4.5 Excluir pedido

**DELETE** `/admin/orders/:id`

---

## 5) Endpoint obrigatorio de agregacao (BFF)

Base URL local: `http://localhost:4000`

### 5.1 Agregacao de dados

**GET** `/aggregated-data`

Query params:

- `origin` (lat,lng)
- `destination` (lat,lng)

Exemplo:

`GET /aggregated-data?origin=-25.4294,-49.2719&destination=-25.4384,-49.2733`

Resposta:

```json
{
  "generatedAt": "2026-05-01T20:15:00.000Z",
  "source": "bff-aggregated",
  "products": [],
  "orders": [],
  "route": {
    "provider": "google-maps"
  }
}
```

---

## 6) Tela administrativa no frontend

No microfrontend foram implementadas duas abas:

- **Planejador de rota**: selecao de origem/destino no mapa
- **Admin pedidos**: CRUD de pedidos (listar, criar, editar, excluir)

URL local do frontend:

- `http://localhost:3000`

---

## 7) Roteiro rapido de demonstracao (entrega)

1. Abrir Swagger de produtos em `http://localhost:4001/docs`
2. Demonstrar `POST /products` e `GET /products`
3. Abrir frontend `http://localhost:3000`
4. Ir na aba **Admin pedidos**
5. Criar, editar e excluir pedido
6. Voltar para aba de rota e chamar agregacao pelo mapa
7. Mostrar que o front fala somente com o BFF

---

## 8) Arquivos alterados para esta entrega

- `ms-products/src/server.js`
- `bff/src/server.js`
- `microfrontend/src/App.jsx`
- `microfrontend/src/App.css`

