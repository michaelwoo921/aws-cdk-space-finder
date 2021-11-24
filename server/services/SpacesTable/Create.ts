import * as AWS from 'aws-sdk';
import { v4 } from 'uuid';
import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from 'aws-lambda';

AWS.config.update({
  region: 'us-west-1',
});

const doClient = new AWS.DynamoDB.DocumentClient();

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  const result = {
    statusCode: 200,
    body: 'Hello from DynamoDB',
  };

  const item =
    typeof event.body === 'object' ? event.body : JSON.parse(event.body);
  item.spaceId = v4();

  try {
    await doClient
      .put({
        TableName: 'zSpacesTable',
        Item: item,
      })
      .promise();
  } catch (error: any) {
    result.body = error.message;
  }

  result.body = JSON.stringify(`created Item with id: ${item.spaceId}`);

  return result;
}
