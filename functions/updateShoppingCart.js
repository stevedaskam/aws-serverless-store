const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.handler = (event, context, callback) => {
    console.log('Updating Shopping Cart...');
    console.log('Received event = ' + JSON.stringify(event));

    let cart = JSON.parse(event['body']);

    var params = {
        TableName:"shopping-cart",
        Key: {
            UserId : cart.UserId
        },
        UpdateExpression: "set Products = :Products",
        ExpressionAttributeValues:{
            ":Products": cart.Products
        },
        ReturnValues:"UPDATED_NEW"
    };

    docClient.update(params, function(err, data) {
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
