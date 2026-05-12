# API Gateway (entrega obrigatória)

Você pode usar AWS API Gateway na frente do BFF e dos microservices.

## Rotas sugeridas

- `GET /app/aggregated-data` -> BFF `GET /aggregated-data`
- `ANY /app/products/{proxy+}` -> Products service
- `ANY /app/orders/{proxy+}` -> Orders service
- `GET /app/route-estimator` -> Azure Function

## Segurança sugerida

- API Key no Gateway
- Rate limit por rota
- CORS centralizado
- JWT Authorizer (se tiver autenticação)

## Demonstração

1. Front chama somente domínio do Gateway (não chama serviço direto)
2. Gateway roteia para BFF
3. BFF agrega dados e responde JSON único
