import express from "express";
import bodyParser from "body-parser";
import { h2i } from "./worker";

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
  const { html } = req.body;

  const { url } = await h2i(html);

  res.json({ url });
});

export { app };
