const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.handler = (event, context, callback) => {
    console.log('Creating new order...');
    console.log('event = ' + JSON.stringify(event));

    let order = JSON.parse(event['body']);
    console.log(order);
    console.log("OrderId = " + order.OrderId);

    let params = {
        TableName: 'orders',
        Key: {
            OrderId: order.OrderId
        },
        Item: order
    };

    docClient.put(params, function(err, data) {
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
                body: JSON.stringify({ status: 'OK' })
            };

            callback(null, response);
        }
    });
};
