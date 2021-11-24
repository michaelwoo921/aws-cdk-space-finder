export async function handler(event: any, context: any) {
  console.log('got event');
  console.log(event);
  return {
    statusCode: 200,
    body: 'hello from lambda',
  };
}
