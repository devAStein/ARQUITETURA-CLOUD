# Delivery Route - Distributed Architecture Template

Template base para o seu trabalho com:
- Microfrontend (React SPA)
- BFF (Node.js)
- Microservice 1 (MongoDB Atlas)
- Microservice 2 (Azure SQL)
- Azure Function (HTTP Trigger)
- API Gateway (documentado em `docs/api-gateway.md`)

## Estrutura

- `microfrontend`: interface da aplicação (consome apenas o BFF)
- `bff`: endpoint obrigatório `GET /aggregated-data`
- `ms-products`: domínio de produtos (MongoDB)
- `ms-orders`: domínio de pedidos (Azure SQL)
- `azure-function`: cálculo/enriquecimento de rota via Google Maps ou fallback OpenStreetMap/OSRM
- `docs`: apoio de arquitetura e gateway

## Fluxo

1. Usuário acessa o Microfrontend
2. Front chama `GET /aggregated-data` no BFF
3. BFF consulta:
   - `ms-products`
   - `ms-orders`
   - Azure Function
4. BFF retorna JSON único para o front

## Como rodar

1. Copie os exemplos de ambiente:
   - `bff/.env.example` para `bff/.env`
   - `ms-products/.env.example` para `ms-products/.env`
   - `ms-orders/.env.example` para `ms-orders/.env`
   - `azure-function/local.settings.example.json` para `azure-function/local.settings.json`
2. Instale dependências em cada pasta:
   - `npm install`
3. Inicie cada serviço em terminais separados:
   - `ms-products`: `npm run dev`
   - `ms-orders`: `npm run dev`
   - `azure-function`: `npm run start`
   - `bff`: `npm run dev`
   - `microfrontend`: `npm run dev`
4. Acesse:
   - Front: `http://localhost:3000`
   - BFF: `http://localhost:4000/aggregated-data`
   - Products docs: `http://localhost:4001/docs`
   - Orders docs: `http://localhost:4002/docs`

## Padrões aplicados

- Clean Architecture: separação por responsabilidade entre front, orquestração e domínios
- Vertical Slice: endpoints por caso de uso (CRUD por domínio e agregação no BFF)
- Event-Driven Architecture: diretriz de evolução descrita em `docs/event-driven.md`
- API Gateway + BFF + Microservices + Database + Serverless: composição completa da entrega

