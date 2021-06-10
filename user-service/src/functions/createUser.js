'use strict';
const AWS = require('aws-sdk')

module.exports.createUser = async (event, context) => {

  const body = JSON.parse(event.body)
  const username = body.username
  const password = body.password

  const newUserParams = {
    TableName: ProcessingInstruction.env.DYNAMO_USER_TABLE,
    Item: {
      pk: username,
      password: password
    }
  }

  try {
    const dynamodb = new AWS.DynamoDB.DoocmentClient()
    const putResult = await dynammodb.put(newUserParams)

    return response = {
    };

  } catch (putError) {
    console.log("There was an error putting item");
    console.log("putError", putError);
    console.log('newUserParams', newUserParams);
    return new Error('Error putting item')
  }

  
};
