'use strict';
const AWS = require('aws-sdk');
const ServerlessUsers = require('../schema/users');
const { MongoClient } = require('mongodb');
const secrets = require('../../secrets.json');



const mongoose = require('mongoose');

mongoose
  .connect(secrets.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log('DB Connected!');
  })
  .catch((err) => {
    console.log(Error, err.message);
  });



module.exports.createUser = async (event, context) => {

  //await connectToDatabase()

  const body = JSON.parse(event.body);

  console.log(body)
  const username = body.username;
  const password = body.password;

  const res = {
    username,
    password,
  };

  try {
   

    const result = await ServerlessUsers.create(res);


     const message = {
       data: result,
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


// let cachedDB = null

// async function connectToDatabase () {
//     if (cachedDB) {
//         console.log('use existing connection')
//         return Promise.resolve(cachedDB);
//     } else {
//         return MongoClient.connect(secrets.MONGODB_URI, {
//             native_parser: true,
//             useUnifiedTopology: true
//         })
//             .then((client) => {
//                 let db = client.db('serverlessTest')
//                 console.log("New Database connection");
//                 cachedDB = db
//                 return cachedDB
//             }).catch((error) => {
//             console.log("Mongo connection error");
//             console.log(error);
//         })
//     }
// }