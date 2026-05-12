Link do GitHub = https://github.com/devAStein/ARQUITETURA-CLOUD/tree/refactor/vertical-slice-clean-architecture

# Prompts utilizados na refatoração da aplicação

## Prompt 1 — Diagnóstico inicial da aplicação
Analise a estrutura atual deste projeto sem modificar nenhum arquivo.

Identifique:
1. Qual é a arquitetura atual do projeto.
2. Quais são as principais funcionalidades existentes.
3. Onde estão controllers, rotas, services, repositories, models, banco de dados e regras de negócio.
4. Quais problemas existem em relação a acoplamento, duplicidade, nomes ruins, funções grandes ou mistura de responsabilidades.
5. Como este projeto pode ser reorganizado aplicando Vertical Slice, Clean Architecture e Clean Code.

Importante:
- Não altere nenhum arquivo nesta etapa.
- Não invente novas funcionalidades.
- Preserve o comportamento atual da aplicação.
- Ao final, proponha um plano de refatoração em etapas pequenas e seguras.

## Prompt 2 — Proposta de nova estrutura
Com base na análise anterior, proponha uma nova estrutura de pastas para este projeto aplicando Vertical Slice combinado com Clean Architecture.

A estrutura deve organizar o código por funcionalidades, por exemplo:
- features/
- shared/
- domain/
- application/
- infrastructure/
- presentation/

Adapte os nomes conforme o padrão e a tecnologia já usada no projeto.

Importante:
- Não modifique os arquivos ainda.
- Não crie funcionalidades novas.
- Explique qual responsabilidade cada pasta terá.
- Indique quais arquivos atuais devem ser movidos ou refatorados.

## Prompt 3 — Refatoração global controlada do projeto
Refatore o projeto inteiro aplicando Vertical Slice, Clean Architecture e Clean Code, respeitando a estrutura e as funcionalidades já existentes.

Contexto:
Este projeto possui uma arquitetura com múltiplos módulos, incluindo:
- azure-function
- bff
- microfrontend
- ms-orders
- ms-products
- docs

Objetivo:
Reorganizar e melhorar o código existente sem alterar o comportamento funcional da aplicação.

Aplique os seguintes conceitos:

1. Vertical Slice
- Organize o código por funcionalidades ou casos de uso.
- Dentro de cada módulo, agrupe arquivos relacionados à mesma funcionalidade.
- Evite deixar a regra de negócio espalhada em controllers, rotas ou arquivos genéricos.
- Quando aplicável, crie pastas como features, use-cases, controllers, repositories, dtos, validators e domain.

2. Clean Architecture
- Separe responsabilidades entre:
  - camada de apresentação/controllers/routes
  - camada de aplicação/use cases
  - camada de domínio/regras de negócio
  - camada de infraestrutura/banco de dados/apis externas/frameworks
- A regra de negócio não deve depender diretamente de framework, banco de dados, Azure Function, HTTP, Express, React ou outra tecnologia externa.
- Mantenha integrações externas isoladas na camada de infraestrutura.

3. Clean Code
- Melhore nomes de variáveis, funções, classes, arquivos e pastas.
- Reduza duplicidade de código.
- Divida funções grandes em funções menores.
- Remova responsabilidades misturadas.
- Padronize retornos, erros e validações quando for seguro.
- Remova comentários desnecessários, mantendo apenas comentários úteis.
- Preserve clareza, simplicidade e legibilidade.

Regras obrigatórias:
- Não crie funcionalidades novas.
- Não remova funcionalidades existentes.
- Não altere contratos de API sem necessidade.
- Não altere nomes de rotas, endpoints ou payloads se isso puder quebrar o funcionamento.
- Não altere banco de dados, schemas ou migrations sem necessidade.
- Não invente regras de negócio.
- Não altere arquivos de documentação como se fossem código, exceto se for necessário registrar a nova arquitetura.
- Faça a refatoração de forma segura e incremental.
- Se algum trecho do código estiver ambíguo, preserve o comportamento atual.
- Atualize imports e referências internas após mover arquivos.
- Se existir teste, lint ou build, execute ao final.
- Se não existirem testes, faça ao menos uma verificação estática dos imports e dos comandos disponíveis no package.json ou arquivos equivalentes.

Ao final, apresente:
1. Resumo das mudanças realizadas.
2. Estrutura de pastas antes e depois.
3. Quais módulos foram refatorados.
4. Onde foi aplicado Vertical Slice.
5. Onde foi aplicada Clean Architecture.
6. Quais melhorias de Clean Code foram feitas.
7. Quais arquivos foram alterados.
8. Quais comandos foram executados para validar o projeto.
9. Quais pontos ainda precisam de revisão manual.

## Prompt 4 — Verificação e correção pós-refatoração
Revise toda a refatoração realizada e verifique se o projeto continua consistente.

Verifique obrigatoriamente:
1. Imports quebrados.
2. Arquivos movidos sem atualização de referência.
3. Rotas ou endpoints alterados indevidamente.
4. Funções que mudaram comportamento.
5. Duplicidades que permaneceram.
6. Código morto ou arquivos não utilizados.
7. Erros de build, lint ou execução.
8. Inconsistências entre os módulos azure-function, bff, microfrontend, ms-orders e ms-products.

Se encontrar problemas:
- Corrija apenas o necessário.
- Preserve o comportamento original.
- Não crie funcionalidades novas.
- Não altere contratos de API sem necessidade.
- Não altere banco de dados sem necessidade.

Ao final, apresente:
1. Problemas encontrados.
2. Correções realizadas.
3. Comandos executados.
4. Resultado da validação.
5. Pontos que precisam ser conferidos manualmente.

