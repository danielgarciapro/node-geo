wget http://dynamodb-local.s3-website-us-west-2.amazonaws.com/dynamodb_local_latest.tar.gz
gunzip dynamodb_local_latest.tar.gz
mkdir ./dynamolocal
mv dynamodb_local_latest.tar ./dynamolocal
cd ./dynamolocal
tar -xvf dynamodb_local_latest.tar
java -Djava.library.path=./DynamoDBLocal_lib/ -jar DynamoDBLocal.jar