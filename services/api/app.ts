import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ChromeImageExport, image } from "./chrome";
import { upload } from "./s3";
import { nanoid } from "nanoid";
import assert from "assert";
import * as k from "./k";

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

const app = express();

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "6mb",
  }),
);

app.get("/", (req, res) => {
  res.redirect("https://html2.io");
});

app.use(bodyParser.json());

app.use(logErrors);

app.get("/image", async (req, res) => {
  const { html, url, width: q_width, height: q_height } = req.query;

  // parse
  const width = q_width && parseInt(q_width as string);
  const height = q_height && parseInt(q_height as string);

  const id = nanoid();

  // validations
  try {
    assert(html || url, "html or url is required");
    if (url) {
      assert(typeof url === "string", "url must be a string");
      try {
        new URL(url);
      } catch (e) {
        assert.fail("url is not a valid url");
      }
    }
    if (html) {
      assert(typeof html === "string", "html must be a string");
    }
    if (width || height) {
      assert(typeof width === "number", "width must be a number");
      assert(typeof height === "number", "height must be a number");

      // both must be set
      assert(width && height, "both width and height must be set");
    }
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.message });
  }

  // main
  try {
    res.json(
      await handleImageRequest({
        mode: url ? "url" : "src",
        id,
        url: url as string,
        src: html as string,
        viewport: width && height ? { width, height } : k.DEFAULT_VIEWPORT,
      }),
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

app.post("/image", async (req, res) => {
  const { html, url, src, width, height } = req.body;
  const id = nanoid();

  // validations
  try {
    assert(html || url || src, "html, url or src is required");
    if (url) {
      try {
        new URL(url);
      } catch (e) {
        assert.fail("url is not a valid url");
      }
    }
    if (html) {
      assert(typeof html === "string", "html must be a string");
    }
    if (src) {
      if (typeof src === "object") {
        assert(src["index.html"], "src must contain index.html");
      }
    }
    if (width || height) {
      assert(typeof width === "number", "width must be a number");
      assert(typeof height === "number", "height must be a number");
      // both must be set
      assert(width && height, "both width and height must be set");
    }
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.message });
  }

  // main
  try {
    res.json(
      await handleImageRequest({
        mode: url ? "url" : "src",
        id,
        url,
        src: src ?? html,
        viewport: width && height ? { width, height } : k.DEFAULT_VIEWPORT,
      }),
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

async function handleImageRequest({
  id,
  url,
  src,
  mode,
}: {
  id: string;
} & ChromeImageExport) {
  const { title, img, userAgent, version } = await image({
    mode,
    url,
    src,
  });

  const imgurl = await upload(
    `${id}.png`,
    // create a buffer from the base64 string
    Buffer.from(img.replace(/^data:image\/png;base64,/, ""), "base64"),
  );

  return {
    id: id,
    title,
    userAgent,
    url: imgurl,
    chrome: {
      version,
    },
  };
}

export { app };
