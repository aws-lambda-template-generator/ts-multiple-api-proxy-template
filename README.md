# ts-standard-api-proxy-template

AWS Lambda function template with TypeScript for creating a API proxy with multiple endpoints that support both Get and Post methods. It creates an API proxy for the endpoints from [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

This API creates 6 different endpoints

| Endpoint       | Method | Output                  |
| -------------- | ------ | ----------------------- |
| /get-users     | GET    | Get all users           |
| /get-user/{id} | GET    | Get a single user by id |
| /add-user      | POST   | Add a user              |
| /get-posts     | GET    | Get all posts           |
| /get-post/{id} | GET    | Get a single post by id |
| /add-post      | POST   | Add a post              |

Data Examples

1. For add-user

User data

```json
{
  "id": 2,
  "name": "Ervin Howell",
  "username": "Antonette",
  "email": "Shanna@melissa.tv",
  "address": {
    "street": "Victor Plains",
    "suite": "Suite 879",
    "city": "Wisokyburgh",
    "zipcode": "90566-7771",
    "geo": {
      "lat": "-43.9509",
      "lng": "-34.4618"
    }
  },
  "phone": "010-692-6593 x09125",
  "website": "anastasia.net",
  "company": {
    "name": "Deckow-Crist",
    "catchPhrase": "Proactive didactic contingency",
    "bs": "synergize scalable supply-chains"
  }
}
```

response comes back with mock id which is always the same

```json
{
  "id": 11
}
```

2. for add-post

Post data example

```json
{
  "userId": 1,
  "id": 2,
  "title": "qui est esse",
  "body": "est rerum tempore"
}
```

response comes back with mock id which is always the same

```json
{
  "id": 101
}
```

## Tools and Framework

- Serverless
- Webpack
- Typescript
- Jenkins
- Mocha

## AWS Services

- Lambda
- API Gateway

### Setup

(1) Install all modules

```bash
yarn install
```

### Running Test

It uses mocha for unit & integration tests. Istanbul for coverage.

```bash
# unit test
yarn test
# integration test
yarn run integration
```

### Deployment

Use `sls` commands. Make sure to install serverless globally (`yarn global add serverless`)

```bash
# nonprod
sls deploy --stage nonprod

# prod
sls deploy --stage prod
```

To remove, run the command below:

```bash
sls remove --stage nonprod
```

### Checking endpoint

```bash
curl -H "x-api-key: <api key" -X GET https://url
```

### Memory Optimisation

We recommend to use AWS Lambda Power Tuning to optimise the memory size allocation (see details [here](https://www.mydatahack.com/how-to-optimise-memory-allocation-for-lambda-functions/)).
