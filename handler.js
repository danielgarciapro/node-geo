const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const ddbGeo = require('dynamodb-geo');
const AWS = require('aws-sdk');
const serverless = require('serverless-http')

// Set up AWS
// AWS.config.update({
//     accessKeyId: "YOUR_AWS_KEY_ID",
//     secretAccessKey: "YOUR_AWS_SECRET_ACCESS_KEY",
//     region: "YOUR_AWS_REGION"
//   });

const hostname = '127.0.0.1';
const port = 3000;

const ddb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8000') });
const config = new ddbGeo.GeoDataManagerConfiguration(ddb, 'capitals');
const manager = new ddbGeo.GeoDataManager(config);

const server = http.createServer(app);

app.use('/', (req, res) => {
  var results = manager.queryRadius({
    RadiusInMeter: 100000,
    CenterPoint: {
      latitude: 37.88,
      longitude: -4.78
    }
  }).then((locations) => res.send(locations))
    .catch(err => res.status(400).send(err));
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports.handler = serverless(app);