<p align="center">
  <a href="https://html2.io">
    <img src="./artworks/cover.png" alt="html2.io github cover graphic" height="240" />
  </a>
  <h1 align="center"><a href="https://html2.io">html2.io</a></h1>
  <p align="center">Html to image as a service</p>
</p>

## Features

- HTML/CSS to image
- HTML/CSS to pdf
- Markdown to image
- Built-in fonts & emoji support (Apple emoji OK)
- Template engine
- Write Template with React
- CDN Ready
- [View All Features](https://html2.io/docs/features)

## Usage

**Install**

- [Node - `h2i`](https://www.npmjs.com/package/h2i)
- [Python - `h2i`](https://pypi.org/project/h2i/)

```
yarn add h2i
```

**Simple usage**

```ts
import * as H2I from "h2i";

const img = H2I.Client({
  apiKey: "<your-api-key>",
});

img.fromFile("test.html").then((image) => {
  image.save("test.png");
});

img.fromUrl("https://google.com").then((image) => {
  image.save("google.png");
});

img.fromHtml("<h1>Hello world</h1>").then((image) => {
  image.save("hello.png");
});

img.fromMd("# Hello world").then((image) => {
  image.save("hello.png");
});

img
  .fromRepo("https://github.com/gridaco/html2.io", {
    branch: "master",
    path: "README.md",
  })
  .then((image) => {
    image.save("readme.png");
  });
```

## Aknowledgements

Special thanks to:

- Puppeteer
- Chromium

## License

The source code and artworks are [Apache 2.0 licensed](./LICENSE), yet it is not allowed to deploy the whole service to make a replica service for money without huge modification.
