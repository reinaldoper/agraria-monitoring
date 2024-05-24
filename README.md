# Agraria Monitoring

## Visão Geral

Aplicação web para monitoramento de dispositivos IoT em tempo real, com autenticação de usuários e dashboard de visualização de dados.

## Tecnologias Utilizadas

- **Backend**: Node.js, Express, Docker, PostgreSQL
- **Frontend**: React-vite
- **Autenticação**: JWT
- **Comunicação Telnet**: telnet-client

## Decisões de Design

- **Separação de responsabilidades**: Backend para API e lógica de negócios; Frontend para interface do usuário.
- **Uso de JWT**: Para autenticação segura e escalável.
- **PostgreSql**: Para armazenamento eficiente e flexível de dados de usuários e dispositivos.

## Sugestões de Melhorias

1. **Autenticação JWT na API**.
2. **Filtro por usuário nos dispositivos**.
3. **Notificações via WebSocket**.
4. **Paginação e ordenação na listagem de dispositivos**.

### Estrutura do Projeto:

- O projeto segue uma estrutura organizada para garantir clareza e manutenibilidade do código. 
- Abaixo está uma visão geral da estrutura de diretórios do frontend:

```shell
frontend/
|-- public/
|-- src/
|   |-- assets/
|   |-- environment/
|   |-- components/
|   |-- pages/
|   |-- Routers/
|   |-- service/
|   |-- styles/
|   |-- utils/
|   |-- _tests_/
|-- main.tsx
|-- tsconfig.json
|-- package.json
|-- ...
```

- src/: Contém os principais códigos fonte do projeto.
- components/: Componentes React reutilizáveis.
- pages/: Páginas da aplicação.
- service/: Serviços para integração com API ou lógica de negócios.
- styles/: Estilos globais ou compartilhados.
- Routers/: Rotas da aplicação.
- environment/: Variaveis.
- tests/: Todos os testes da aplicação.
- utils/: Retorna URL da aplicação.
- tsconfig.json: Configurações TypeScript.
- package.json: Dependências e scripts do projeto.

## Como Rodar o Projeto

1. Clone o repositório

   ```shell
   git clone <URL>
   cd agraria-monitoring
   ```

2. Configure o Backend

    ```shell
    cd backend
    npm install
    npm run dev
    ```

3. Rode o docker compose
   
   ```shell
   cd backend
   docker compose up
   ```

4. Atualize as migrações do Banco de dados

   ```shell
   npx prisma migrate dev
   npx prisma migrate deploy
   ```

5. Configure o Frontend

    ```shell
    cd frontend
    npm install
    npm run dev
    ```
6. Configure o .env conforme o .env.example

