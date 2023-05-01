import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import * as k from "../k";

const s3 = new S3Client({});

export async function upload(key: string, file: Buffer | string | Uint8Array) {
  const params: PutObjectCommandInput = {
    Bucket: k.BUCKET,
    Key: key,
    Body: file,
    ContentEncoding: "base64",
    ContentType: "image/png",
    ACL: "public-read",
  };

  const command = new PutObjectCommand(params);

  await s3.send(command);

  return `https://${k.BUCKET}.s3.amazonaws.com/${key}`;
}
