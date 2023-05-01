import express from "express";
import bodyParser from "body-parser";
import { image } from "./chrome";
import { upload } from "./s3";
import { nanoid } from "nanoid";

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

const app = express();

app.get("/", (req, res) => {
  res.redirect("https://html2.io");
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(bodyParser.json());

app.use(logErrors);

app.post("/image", async (req, res) => {
  const { html, url } = req.body;
  try {
    const id = nanoid();

    const { title, img, userAgent, version } = await image(url);

    const imgurl = await upload(`${id}.png`, img);

    res.json({
      id: id,
      title,
      userAgent,
      url: imgurl,
      chrome: {
        version,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

export { app };
