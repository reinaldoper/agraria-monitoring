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
   docker compose up
   ```

4. Configure o Frontend

    ```shell
    cd frontend
    npm install
    npm run dev
    ```

