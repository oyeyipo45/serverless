'use strict';
const AWS = require('aws-sdk');
const ServerlessUsers = require('./user');




module.exports.createUser = async (event, context) => {
  const body = JSON.parse(event.body);
  const username = body.username;
  const password = body.password;

  const res = {
    username,
    password,
  };

  try {
    const message = {
      data: res,
      message: 'success',
    };

    let gg = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Authorization',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(message),
    };

    return gg;
  } catch (putError) {
    console.log('There was an error putting the new item');
    console.log('putError', putError);
    return new Error('There was an error putting the new item');
  }
};




module.exports.findUsers = async (event) => {
  try {
    const result = await ServerlessUsers.find();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (e) {
    console.error(e);
  }
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};




// module.exports.createUser = async (event, context) => {
//   const body = JSON.parse(event.body);
//   const username = body.username;
//   const password = body.password;

//   console.log(process.env.DYNAMODB_USER_TABLE);
//   console.log(process.env.GG);
//   // const newUserParams = {
//   //   TableName: "user-service-dev",
//   //   Item: {
//   //     pk: username,
//   //     password: password,
//   //   },
//   // };

//   const repsonses = { 
//     username, password
//   }

//   console.log(newUserParams.TableName)
//   try {
//     // const dynamodb = new AWS.DynamoDB.DocumentClient();
//     // const putResult = await dynamodb.put(newUserParams).promise();
//     return {
//       statusCode: 201,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Credentials': true,
//         'Access-Control-Allow-Headers': 'Authorization',
//       },
//       repsonses: JSON.stringify(repsonses),
//       success: true,
//     };
//   } catch (putError) {
//     console.log('There was an error putting the new item');
//     console.log('putError', putError);
//     console.log('newUserParams', newUserParams);
//     return new Error('There was an error putting the new item');
//   }
// };