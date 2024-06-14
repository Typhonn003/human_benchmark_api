## Instalar dependências:

```bash
# caso use npm
npm install

# para rodar as migrações localmente
npx prisma migrate dev

# caso você queira rodar a aplicação localmente
npm run dev

```

## **Endpoints**

| HTTP Method | Description      | Endpoint         | Authentication Required | Acess Level   |
| ----------- | ---------------- | ---------------- | ----------------------- | ------------- |
| POST        | Login user       | `/login`         | No Authentication       | None          |
| POST        | Register user    | `/users`         | No Authentication       | None          |
| PATCH       | Update user      | `/users/:id`     | Authenticated           | User OR Admin |
| GET         | Get user profile | `/users/profile` | Authenticated           | User OR Admin |
| GET         | Get users        | `/users`         | No Authentication       | None          |
| GET         | Get user         | `/users/:id`     | No Authentication       | None          |
| DELETE      | Delete user      | `/users/:id`     | Authenticated           | User OR Admin |
| --          | --               | --               | --                      | --            |
| POST        | Create ads       | `/game`          | Authenticated           | Admin         |
| GET         | List all game    | `/game`          | No Authentication       | None          |
| GET         | Retrieve game    | `/game/:id`      | Authenticated           | None          |
| PATCH       | Update game      | `/game/:id`      | Authenticated           | Admin         |
| DELETE      | Delete game      | `/game/:id`      | Authenticated           | Admin         |
| --          | --               | --               | --                      | --            |
| POST        | Post score       | `/score/`        | Authenticated           | User or Admin |
| GET         | Get scores       | `/score/`        | No Authentication       | None          |
| GET         | Get score        | `/score/:id`     | No Authentication       | None          |
| PATCH       | Patch score      | `/score/:id`     | Authenticated           | Admin         |
| DELETE      | Delete score     | `/score/:id`     | Authenticated           | Admin         |

O arquivo do ambiente Insomia pronto pode ser encontrado [aqui!](/InsomniaSchema.json)

## Diagrama do Der:

![DB Diagram](/DBDiagram.png)
