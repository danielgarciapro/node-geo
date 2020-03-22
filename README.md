# Nodejs dynamodb-geo implementation

## Install dependencies:
```
npm install
```

## Create and run local DynamoDB database:
```
sh local-dynamodb.sh
```

## Run DynamoDB database (required Java):
```
java -Djava.library.path=./dynamolocal/DynamoDBLocal_lib/ -jar dynamolocal/DynamoDBLocal.jar
```

## Run example:
```
node index.js
```