# `base/h2i`

Html to image as a service

## Usage

**Install**

```
yarn add @base-sdk/h2i
```

**Simple usage**

```ts
import HI from "@base-sdk/h2i";

const hi = new HI();

hi.fromFile("test.html").then((image) => {
  image.save("test.png");
});

hi.fromUrl("https://google.com").then((image) => {
  image.save("google.png");
});

hi.fromHtml("<h1>Hello world</h1>").then((image) => {
  image.save("hello.png");
});
```
