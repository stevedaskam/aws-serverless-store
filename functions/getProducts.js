const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    console.log('Retrieving products...');
    console.log('Received event = ' + JSON.stringify(event));

    let category = (event.queryStringParameters && event.queryStringParameters.category) ? event.queryStringParameters.category : 'best-sellers';

    let params = {
        TableName: 'products',
        IndexName: 'Category-ProductName-index',
        Limit: 15,
        KeyConditionExpression:"Category = :v_category",
        ExpressionAttributeValues: {
            ":v_category": category
        },
        "ScanIndexForward": false
    };

    docClient.query(params, function(err, data) {
        if (err) {
            console.log(JSON.stringify(err));
            callback(err, null);
        } else {
            const response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status: 'OK', data: data })
            };

            callback(null, response);
        }
    });
};
