import React from "react";
import { HomeDemoDropzone } from "./home-dropzone";
import * as H2I from "h2i";

const img = H2I.Client({
  apiRoot: "http://localhost:4026",
});

export function HomeDemo() {
  const onHtml = (html) => {
    img.fromHtml(html).then((img) => {
      console.log(img);
    });
  };

  return (
    <>
      <HomeDemoDropzone onHtml={onHtml} />
    </>
  );
}
