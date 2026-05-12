# Event-Driven Architecture (evolução)

Para atender ao requisito de arquitetura orientada a eventos, evolua do CRUD síncrono para eventos de domínio:

- `product.created`
- `order.created`
- `route.calculated`

## Implementação simples para apresentação

1. Ao criar produto/pedido, publicar evento em broker (Azure Service Bus ou RabbitMQ)
2. Criar consumidor no BFF para manter um read model agregado
3. Expor endpoint `GET /aggregated-data` lendo esse read model

## Benefícios na apresentação

- desacoplamento entre serviços
- melhor escalabilidade
- tolerância a falhas
