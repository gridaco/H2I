import React, { useEffect } from "react";
import { HomeDemoDropzone } from "./home-dropzone";
import * as H2I from "h2i";

const img = H2I.Client({
  apiRoot: "http://localhost:4026",
});

export function HomeDemo() {
  const [html, setHtml] = React.useState<string | null>(null);
  const [src, setSrc] = React.useState<string | null>(null);

  useEffect(() => {
    if (!html) {
      return;
    }

    img.fromHtml(html).then(({ data }) => {
      setSrc(data.url);
    });
  }, [html]);

  return (
    <>
      <HomeDemoDropzone onHtml={setHtml} />
      {src && <img src={src} width="100%" height="100%" />}
    </>
  );
}
