# Adaptação rápida (copiar e colar)

## 1) BFF (`bff/.env`)

```env
PORT=4000
PRODUCTS_SERVICE_URL=https://SEU-MS-PRODUCTS.azurewebsites.net
ORDERS_SERVICE_URL=https://SEU-MS-ORDERS.azurewebsites.net
AZURE_FUNCTION_URL=https://SUA-FUNCTION.azurewebsites.net/api/route-estimator
GOOGLE_MAPS_API_KEY=SUA_CHAVE_GOOGLE_MAPS
OSRM_BASE_URL=https://router.project-osrm.org
```

Se `GOOGLE_MAPS_API_KEY` estiver vazio, a Function usa fallback de OpenStreetMap/OSRM.

## 2) Products (`ms-products/.env`)

```env
PORT=4001
MONGODB_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/delivery_app?retryWrites=true&w=majority
```

## 3) Orders (`ms-orders/.env`)

```env
PORT=4002
SQL_SERVER=tcp:SEU-SERVIDOR.database.windows.net
SQL_DATABASE=SEU_BANCO
SQL_USER=SEU_USUARIO
SQL_PASSWORD=SUA_SENHA
SQL_PORT=1433
```

## 4) Endpoint obrigatório para prova

`GET /aggregated-data`

Exemplo:

`http://localhost:4000/aggregated-data?origin=-25.4294,-49.2719&destination=-25.4384,-49.2733`

## 5) O que apresentar ao professor

- Microfrontend consumindo apenas BFF
- BFF agregando 3 fontes (Mongo + SQL + Function)
- Swagger em ambos microservices (`/docs`)
- API Gateway na frente dos endpoints (roteando para BFF e serviços)
