export default function (event: any, context: any, callback: any) {
  callback(null, {
    statusCode: 200,
    body: "Hello, World",
  });
}
