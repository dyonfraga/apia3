# Integrantes:

* Dyon Fraga Comassetto - 324241390
* Bernado Lencina - 1302315825
  


# Descrição do Projeto:

* Este projeto é uma API RESTful desenvolvida em Node.js e MongoDB com autenticação baseada em JWT (JSON Web Token). Ele fornece endpoints para registro e login de usuários, além de permitir operações CRUD (Criar, Ler, Atualizar e Deletar) de itens no banco de dados.




# Funcionalidades:

* Registro de usuários com criptografia de senha.
* Autenticação via login e geração de tokens JWT.
* Middleware para proteção de rotas com validação de tokens.
* Operações CRUD para gerenciamento de itens.
* Conexão com banco de dados remoto MongoDB.


# Tecnologias Utilizadas:

* Node.js: Ambiente de execução JavaScript no servidor.

* Express.js: Framework para criação de APIs em Node.js.

* MongoDB: Banco de dados NoSQL para armazenamento de dados.

* Mongoose: Modelagem de dados no MongoDB.

* JWT (JSON Web Token): Autenticação segura baseada em tokens.

* Bcrypt.js: Criptografia de senhas.


# Instalação e Execução:

1. Pré-requisitos
* Node.js (v14 ou superior)
* MongoDB Atlas (ou uma instância local do MongoDB)
* Postman (ou ferramenta equivalente para testar a API)
2. Configuração
   
* Clone o repositório:

1. Copiar código:

git clone https://github.com/seu_usuario/seu_repositorio.git

cd apia3

* Instale as dependências:

!. Copiar código:

npm install

* Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

.env
!. Copiar código:
JWT_SECRET=sua_chave_secreta
MONGO_URI=sua_uri_do_mongodb
PORT=3000

* Inicie o servidor:


!. Copiar código:
node server.js

* O servidor estará disponível em http://localhost:3000.

# Vídeo demonstrativo no Youtube:

 * https://www.youtube.com/watch?v=EZ1rMLB_K-s
