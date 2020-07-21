# ts-simple-api-proxy-template

AWS Lambda function template with TypeScript for creating a simple API proxy.The example function simply retrieves data from an API endpoint and return it from API gateway.

## Tools and Framework

- Serverless
- Webpack
- Typescript
- Jenkins
- Mocha

### Setup

(1) Install all modules
```bash
npm i
```

### Running Test

It uses mocha for unit & integration tests. Istanbul for coverage.

```bash
# unit test
npm test
# integration test
npm run integration
```

### Deployment

1. Jenkins

The project includes an example Jenkinsfile. Update according to your Jenkins setup for pipeline.

2. From local machine

Use npm command and we can pass arguments as below. Alternatively, we can use sls deploy command.

```bash
npm run deploy -- -stage nonprod

sls deploy -stage nonprod
```

### Checking endpoint

```bash
curl -H "x-api-key: <api key" -X GET https://url
```

### Reference

Tools

- [serverless](https://serverless.com/)
- [webpack](https://webpack.js.org/)
- [serverless-webpack](https://github.com/serverless-heaven/serverless-webpack)
- [source-map-support](https://www.npmjs.com/package/source-map-support)

Configuration & Miscellaneous Reference

- [serverless variables](https://serverless.com/framework/docs/providers/aws/guide/variables/)
- [AWS API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-rest-api.html)
- [JavaScript's strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
- [Setting up tslint auto save](https://www.mydatahack.com/how-to-auto-fix-lint-on-save-with-vs-code-tslint-extension/)
- [TypeScript compiler options](http://www.typescriptlang.org/docs/handbook/compiler-options.html)
- [Nodejs AWS Lambda Boilerplate](https://github.com/mydatahack/nodejs-lambda-serverless-boilerplate)
- [Istanbul with Moca & TypeScript](https://istanbul.js.org/docs/tutorials/typescript/)