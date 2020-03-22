const ddbGeo = require('dynamodb-geo')
const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8000') });

const config = new ddbGeo.GeoDataManagerConfiguration(ddb, 'MyGeoTable')
// Pick a hashKeyLength appropriate to your usage
config.hashKeyLength = 3;

// Use GeoTableUtil to help construct a CreateTableInput.
const createTableInput = ddbGeo.GeoTableUtil.getCreateTableRequest(config);

// Tweak the schema as desired
createTableInput.ProvisionedThroughput.ReadCapacityUnits = 2;

console.log('Creating table with schema:');
console.dir(createTableInput, { depth: null });

// Create the table
ddb.createTable(createTableInput).promise()
    // Wait for it to become ready
    .then(function () { return ddb.waitFor('tableExists', { TableName: config.tableName }).promise() })
    .then(function () { console.log('Table created and ready!') });

// Adding data
myGeoTableManager.putPoint({
    RangeKeyValue: { S: '1234' }, // Use this to ensure uniqueness of the hash/range pairs.
    GeoPoint: { // An object specifying latitutde and longitude as plain numbers. Used to build the geohash, the hashkey and geojson data
        latitude: 51.51,
        longitude: -0.13
    },
    PutItemInput: { // Passed through to the underlying DynamoDB.putItem request. TableName is filled in for you.
        Item: { // The primary key, geohash and geojson data is filled in for you
            country: { S: 'UK' }, // Specify attribute values using { type: value } objects, like the DynamoDB API.
            capital: { S: 'London' }
        },
        // ... Anything else to pass through to `putItem`, eg ConditionExpression
    }
}).promise()
.then(function() { console.log('Done!') });

// Querying a rectangle
myGeoTableManager.queryRectangle({
    MinPoint: {
        latitude: 52.225730,
        longitude: 0.149593
    },
    MaxPoint: {
        latitude: 52.889499,
        longitude: 0.848383
    }
})
// Print the results, an array of DynamoDB.AttributeMaps
.then(console.log);

// Querying 100km from Cambridge, UK
myGeoTableManager.queryRadius({
    RadiusInMeter: 100000,
    CenterPoint: {
        latitude: 52.225730,
        longitude: 0.149593
    }
})
// Print the results, an array of DynamoDB.AttributeMaps
.then(console.log);