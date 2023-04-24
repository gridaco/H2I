import { renderToPng } from "@h2i/worker";
import { nanoid } from "nanoid";
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import * as k from "../k";
import tmp from "tmp";
import fs from "fs";

const s3 = new S3Client({});

export async function h2i(html: string) {
  const id = nanoid();

  const { name: out } = tmp.fileSync({ name: id, postfix: ".png" });

  await renderToPng({ html, outputPath: out });

  const file = fs.readFileSync(out);

  const params: PutObjectCommandInput = {
    Bucket: k.BUCKET,
    Key: `${id}.png`,
    Body: file,
    ContentEncoding: "base64",
    ContentType: "image/png",
    ACL: "public-read",
  };

  const command = new PutObjectCommand(params);

  await s3.send(command);

  return { url: `https://${k.BUCKET}.s3.amazonaws.com/${id}.png` };
}
