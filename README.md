# Projeto: Sistema de Gerenciamento de Funcionários

Este é um sistema completo para gerenciamento de funcionários e equipes, permitindo cadastro, edição, exclusão e visualização de dados. O projeto foi desenvolvido utilizando **React (Vite) no frontend** e **Node.js (Express) no backend**, seguindo o modelo **MVC**.

---

## 📸 Demonstração

![image](https://github.com/user-attachments/assets/1ccd4106-0c07-407c-90d2-13a1f9921dea)

![image](https://github.com/user-attachments/assets/2c7b4555-1238-41f1-aafb-a83bf35c9cf6)

![image](https://github.com/user-attachments/assets/52258c98-6246-474d-90dc-a6ef867e14dc)

![image](https://github.com/user-attachments/assets/5027256a-04dd-4f5f-bfdb-1361ca49fec5)

![image](https://github.com/user-attachments/assets/d4c5e189-a25e-4f0c-ae61-19122320787f)

![image](https://github.com/user-attachments/assets/2ebaba86-2fe0-47eb-a63d-1df5e8045640)

![image](https://github.com/user-attachments/assets/9c5caa16-f54f-45e7-ad4e-e9304f9ddf6d)

![image](https://github.com/user-attachments/assets/c8775eb7-0356-4e0a-9bd2-e0a794af258e)

---

## 🔹Tecnologias Utilizadas

### **📌 Frontend:**
- React.js (Vite)
- React Router
- Axios

### **📌 Backend:**
- Node.js
- Express.js
- NeDB (Banco de dados)
- JWT (Autenticação)

---

## 💻 Como Rodar o Projeto

### **Pré-requisitos:**
✅ Ter **Node.js** e **npm** instalados.

### **1️⃣ Como rodar o backend:**
```
cd MM-api
npm install 
node server.js
```

### **2️⃣ Como rodar o frontend:**
```
cd MM-frontend
npm install
npm run dev
```
Acesse a aplicação em: http://localhost:5173/

---

## 🔑 Configuração das Variáveis de Ambiente
Crie o arquivo config.env dentro da pasta MM-api e adicione:
```
JWT_SECRET=secreto
```

---

## 🗒️ Funcionalidades
✅ Autenticação de usuários  
✅ Cadastro, edição e exclusão de funcionários  
✅ Criação e gerenciamento de equipes  
✅ Listagem e busca de funcionários  
✅ Interface responsiva e moderna  

---

## 🔐 Autenticação

A API usa autenticação via **token JWT**. Para acessar os endpoints protegidos, siga estes passos:

1. **Faça login** com um usuário válido para obter um token JWT:
   ```
   POST http://localhost:5000/login
   Content-Type: application/json

   {
     "email": "usuario@email.com",
     "senha": "123456"
   }
   ```
2. **Copie o token JWT** da resposta e use-o nos próximos requests.

3. No Postman, vá em **Authorization**, selecione Bearer Token no Auth Type e adicione o token na área destinada para isso.

---

## 🚩 Endpoints da API
### 🔹 Autenticação
- `POST /usuarios` → Cadastra um  novo usuário.
  - #### Requisição:
      ```
      {
        "nome": "Nome do Usuário",
        "email": "usuario@gmail.com",
        "senha": "123456"
      }
      ```
  - #### Resposta de sucesso (200 OK):
      ```
      {
        message: "Usuário cadastrado com sucesso!"
      }
      ```
  - #### Possíveis erros:
      - 400 Bad Request → Campos com valores inválidos.
      - 409 Conflict → Email já cadastrado.
      - 500 Internal Server Error → Dificuldade de processamento do servidor.

- `POST /usuarios/login` → Autenticação e geração do token JWT.
  - #### Requisição:
      ```
      {
        "email": "usuario@gmail.com",
        "senha": "123456"
      }
      ```
  - #### Resposta de sucesso (200 OK):
      ```
      {
        "token": "SEU_TOKEN_JWT"
      }
      ```
  - #### Possíveis erros:
      - 400 Bad Request → Campos obrigatórios com valores vazios.
      - 401 Unauthorized → Senha inválida.
      - 404 Not Found → Email não encontrado.
      - 500 Internal Server Error → Dificuldade de processamento do servidor.

### 🔹 Funcionários
- `POST /funcionarios` → Cadastra um novo funcionário.
  - #### Requer autenticação? ✅ Sim
  - #### Requisição:
      ```
      {
          "nome": "Maria",
          "email": "maria@gmail.com",
          "telefone": "999999999",
          "equipeId": "Eupbw1GmmmfLLJk3",
      }
      ```
  - #### Resposta de sucesso (201 Created):
      ```
      {
          "nome": "Maria",
          "email": "maria@gmail.com",
          "telefone": "999999999",
          "equipeId": "Eupbw1GmmmfLLJk3",
          "_id": "0R2YJneX4m6ZFoPs"
      }
      ```
  - #### Possíveis erros:
      - 400 Bad Request → Campos com valores inválidos.
      - 404 Not Found → Equipe não encontrada.
      - 409 Conflict → Email já cadastrado.
      - 500 Internal Server Error → Dificuldade de processamento do servidor.

- `GET /funcionarios` → Lista todos os funcionários.
  - #### Requer autenticação? ✅ Sim
  - #### Resposta de sucesso (200 OK):
      ```
      [
          {
              "nome": "Maria",
              "email": "maria@gmail.com",
              "telefone": "999999999",
              "equipeId": "Eupbw1GmmmfLLJk3",
              "_id": "0R2YJneX4m6ZFoPs"
          },
          {
              "nome": "Carolina",
              "email": "carolina@gmail.com",
              "telefone": "886467897",
              "_id": "2GEGaUqmfXMnsypf",
              "equipeId": null
          }
      ]
      ```
  - #### Possíveis erros:
      - 500 Internal Server Error → Dificuldade de processamento do servidor.

- `GET /funcionarios/:id` → Busca um funcionário pelo seu id.
  - #### Requer autenticação? ✅ Sim
  - #### Resposta de sucesso (200 OK):
      ```
      {
          "nome": "Maria",
          "email": "maria@gmail.com",
          "telefone": "999999999",
          "equipeId": "Eupbw1GmmmfLLJk3",
          "_id": "0R2YJneX4m6ZFoPs"
      }
      ```
  - #### Possíveis erros:
      - 404 Not Found → Funcionário não encontrado.
      - 500 Internal Server Error → Dificuldade de processamento do servidor.

- `GET /funcionarios/equipe/:equipeId` → Lista todos os funcionários de uma equipe específica.
  - #### Requer autenticação? ✅ Sim
  - #### Resposta de sucesso (200 OK):
      ```
      [
          {
              "nome": "Maria",
              "email": "maria@gmail.com",
              "telefone": "999999999",
              "equipeId": "Eupbw1GmmmfLLJk3",
              "_id": "0R2YJneX4m6ZFoPs"
          },
          {
              "nome": "Fernando",
              "email": "fernando@gmail.com",
              "telefone": "987643458",
              "equipeId": "Eupbw1GmmmfLLJk3",
              "_id": "5suB3n7NKBoZdd0V"
          }
      ]
      ```
  - #### Possíveis erros:
      - 500 Internal Server Error → Dificuldade de processamento do servidor.

- `PUT /funcionarios/:id` → Atualiza um funcionário existente.
  - #### Requer autenticação? ✅ Sim
  - #### Requisição (apenas os campos que devem ser atualizados precisam ser enviados, nesse exemplo apenas o telefone):
      ```
      {
        "telefone": "988888888"
      }
      ```
  - #### Resposta de sucesso (200 OK):
      ```
      {
          "message": "Funcionário atualizado com sucesso."
      }
      ```
  - #### Possíveis erros:
      - 400 Bad Request → Campos com valores inválidos.
      - 404 Not Found → Funcionário ou equipe não encontrados.
      - 409 Conflict → Email já cadastrado.
      - 500 Internal Server Error → Dificuldade de processamento do servidor.

- `DELETE /funcionarios/:id` → Remove um funcionário.
  - #### Requer autenticação? ✅ Sim
  - #### Resposta de sucesso (200 OK):
      ```
      {
        message: "Funcionário deletado com sucesso"
      }
      ```
  - #### Possíveis erros:
      - 404 Not Found → Funcionário não encontrado.
      - 500 Internal Server Error → Dificuldade de processamento do servidor.

### 🔹 Equipes
- `POST /equipes` → Cria uma nova equipe.
  - #### Requer autenticação? ✅ Sim
  - #### Requisição:
      ```
      {
          "nome": "Equipe A",
          "descricao": "Equipe ...",
          "liderId": "OlJfuSLYr2Il7J6q"
      }
      ```
  - #### Resposta de sucesso (201 Created):
      ```
      {
          "nome": "Equipe A",
          "descricao": "Equipe...",
          "liderId": "OlJfuSLYr2Il7J6q",
          "_id": "cpCblpA9MJ6H5C0q"
      }
      ```
  - #### Possíveis erros:
      - 400 Bad Request → Campos com valores inválidos.
      - 409 Conflict → Nome de equipe já cadastrado.
      - 500 Internal Server Error → Dificuldade de processamento do servidor.
  
- `GET /equipes` → Lista todas as equipes.
  - #### Requer autenticação? ✅ Sim
  - #### Resposta de sucesso (200 OK):
      ```
      [
          {
              "nome": "Equipe A",
              "descricao": "Equipe...",
              "liderId": "OlJfuSLYr2Il7J6q",
              "_id": "cpCblpA9MJ6H5C0q"
          },
          {
              "nome": "Equipe B",
              "descricao": "Equipe...",
              "liderId": null,
              "_id": "2M3Vuv45gmDq1Voh"
          }
      ]
      ```
  - #### Possíveis erros:
      - 500 Internal Server Error → Dificuldade de processamento do servidor.
  
- `GET /equipes/:id` → Busca uma equipe pelo seu id.
  - #### Requer autenticação? ✅ Sim
  - #### Resposta de sucesso (200 OK):
      ```
      {
          "nome": "Equipe A",
          "descricao": "Equipe...",
          "liderId": "OlJfuSLYr2Il7J6q",
          "_id": "cpCblpA9MJ6H5C0q"
      }
      ```
  - #### Possíveis erros:
      - 404 Not Found → Equipe não encontrada.
      - 500 Internal Server Error → Dificuldade de processamento do servidor.
  
- `PUT /equipes/:id` → Atualiza uma equipe existente.
  - #### Requer autenticação? ✅ Sim
  - #### Requisição (apenas os campos que devem ser atualizados precisam ser enviados, nesse exemplo apenas o nome):
      ```
      {
        "nome": "Equipe C"
      }
      ```
  - #### Resposta de sucesso (200 OK):
      ```
      {
        message: "Equipe atualizada com sucesso." 
      }
      ```
  - #### Possíveis erros:
      - 400 Bad Request → Campos com valores inválidos.
      - 404 Not Found → Equipe ou líder da equipe não encontrados.
      - 409 Conflict → Nome de equipe já cadastrado.
      - 500 Internal Server Error → Dificuldade de processamento do servidor.

- `DELETE /equipes/:id` → Remove uma equipe.
  - #### Requer autenticação? ✅ Sim
  - #### Resposta de sucesso (200 OK):
      ```
      {
        message: "Equipe deletada com sucesso."
      }
      ```
  - #### Possíveis erros:
      - 404 Not Found → Equipe não encontrada.
      - 500 Internal Server Error → Dificuldade de processamento do servidor.

## 💡 Autor
✍️ Ana Luiza Batistel Scorsim
