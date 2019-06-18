const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    console.log('Retrieving products...');

    let params = {
        TableName: 'products',
        Limit: 100
    };

    docClient.scan(params, function(err, data) {
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
