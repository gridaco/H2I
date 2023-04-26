//  import { spawn } from "@h2i/worker";
import { SQS, SNS } from "aws-sdk";

const sqs = new SQS();
const sns = new SNS();

const queueUrl = process.env.SQS_QUEUE_URL;
const topicArn = process.env.SNS_TOPIC_ARN;

if (!queueUrl || !topicArn) {
  console.error(
    "Missing environment variables: SQS_QUEUE_URL and/or SNS_TOPIC_ARN",
  );
  process.exit(1);
}

const processMessage = async (message: any) => {
  const inputUrl = message.body.url;
  const responseId = message.messageId;

  try {
    // const imgBuffer = await spawn(inputUrl);
    await sns
      .publish({
        TopicArn: topicArn,
        Message: JSON.stringify({
          responseId,
          result: imgBuffer.toString("base64"),
        }),
      })
      .promise();
    await sqs
      .deleteMessage({
        QueueUrl: queueUrl,
        ReceiptHandle: message.receiptHandle,
      })
      .promise();
  } catch (error) {
    console.error(`Error processing message ${responseId}:`, error);
  }
};

async function main() {
  while (true) {
    const messages = await sqs
      .receiveMessage({
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 20,
      })
      .promise();

    if (messages.Messages) {
      for (const message of messages.Messages) {
        await processMessage(message);
      }
    }
  }
}

main();
