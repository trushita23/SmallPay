var AWS = require("aws-sdk");
var sqs = new AWS.SQS();
var SQS_URL = "https://sqs.us-east-2.amazonaws.com/665802315873";

exports.handler = async (event) => {
  const req = JSON.stringify(event.invoiceNumber);
  var params = {
    DelaySeconds: 2,
    MessageAttributes: {
      invoiceNumber: {
        DataType: "Number",
        StringValue: req,
      },
    },
    MessageBody: req,
    QueueUrl: `${SQS_URL}/generatePdfQueue`,
  };

  let queueRes = await sqs.sendMessage(params).promise();
  const response = {
    statusCode: 200,
    body: queueRes,
  };

  return response;
};
