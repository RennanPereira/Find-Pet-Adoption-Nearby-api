<div align="center">
  <img 
    alt="Logo Explorer" 
    title="Explorer" 
    src="https://i.imgur.com/jgM1K5Z.png"
  >

  <br>

  <h2 align="center">
    API REST com NodeJS
  </h2>
</div>
<br>

# Find a Friend API 🐾
API desenvolvida para registrar/buscar organizações, especializada em adoção de animais domésticos e vizualizar todos os animais disponíveis para adoção em sua cidade.

## Tecnologias

- [Node](https://nodejs.org/en/docs)
- [Fastify](https://fastify.dev/docs/latest/)
- [JWT](https://jwt.io/introduction)
- [Docker](https://docs.docker.com/)
- [Prisma](https://www.prisma.io/)
- [Zod](https://zod.dev/)

## RFs (Requisitos funcionais)

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

## RNs (Regras de negócio)

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## RNFs (Requisitos não-funcionais)
- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco de dados PostgreSQL
- [x] O usuário deve ser identificado por um JWT(JSON Web Token)
## Instalação

```bash
# Faça o clone do repotório;
  gh repo clone RennanPereira/Find-Pet-Adoption-Nearby-api

# Instalar as dependências do projeto;
  npm i

# Criar arquivo '.env' na raiz do projeto;
  cp .env.exemple .env

# Criar Container no Docker usando os dados do arquivo docker-compose.yml;

# Rodar as migrations;
  npx prisma migrate dev 

# Executando o projeto no ambiente de desenvolvimento
  npm run dev
```
## Rotas
- Criar nova org;
```bash
POST /orgs

Body exemple:
{
  "name":"dogs",
  "owners_name": "John Doe",
  "email": "johndoe@exemple.com",
  "password": "123456",
  "whatsapp": "12341234123",
  "cep": "12341234",
  "state": "Ceará",
  "city": "Fortaleza",
  "street": "rua qualquer",
  "latitude": -3.7754734,
  "longitude": -38.5431986
}
```
- Autenticar org
```bash
POST /orgs/authenticate

Body exemple:
{
 "email":"johndoe@exemple.com",
 "password":"123456"
}
```

- Criar novo pet
```bash
POST /orgs/pet

Body exemple:
{
 "name": "Mike",
 "about": "Cachorro. Raça: mestiço, Cor: branco e marrom",
 "age": "10 anos",
 "size": "mediano",
 "energy_level": "baixo",
 "environment": "dentro de casa",
 "org_id": ""
}
```

- Listar pets por cidade;
```bash
GET /orgs/pets/search
```

- Mostrar pet especifico;
```bash
GET /orgs/pets/:id
```

- Procurar organizações proximas;
```bash
GET /orgs/nearby
```

## Testes automatizados e2e
  - [x] Should be able to create org
  - [x] Should be able to authenticate org
  - [x] Should be able to create pet
  - [x] Should be able to search pet
  - [x] Should be able to get pet
  - [x] Should be able to fetch nearby orgs
