import React, { useEffect } from "react";
import { HomeDemoDropzone } from "./home-dropzone";
import * as H2I from "h2i";
import styled from "@emotion/styled";
import { Editor } from "@monaco-editor/react";
import { PlayIcon, UploadIcon } from "@radix-ui/react-icons";
import { demo_src } from "./k";

const img = H2I.Client({
  apiRoot: "https://api.html2.io/",
});

function CSB() {
  return (
    <>
      <iframe
        src="https://codesandbox.io/embed/new?codemirror=1&highlights=6,7,8,9"
        style={{
          width: "100%",
          height: 500,
          border: 0,
          borderRadius: 4,
          overflow: "hidden",
        }}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </>
  );
}

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

  // return (
  //   <HomeDemoContainer>
  //     <CSB />
  //   </HomeDemoContainer>
  // );

  return (
    <HomeDemoContainer>
      <section className="panel" style={{ background: "#1E1E1E" }}>
        <header></header>
        <Editor
          theme="vs-dark"
          loading={<></>}
          value={demo_src.value}
          language={demo_src.language}
          options={{
            minimap: { enabled: false },
          }}
        />
        <footer>
          <button>
            <UploadIcon />
          </button>
        </footer>
      </section>
      <button className="cta">
        <PlayIcon />
      </button>
      <section className="panel">
        {src && <img src={src} width="100%" height="100%" />}
      </section>
      {/* <HomeDemoDropzone onHtml={setHtml} /> */}
    </HomeDemoContainer>
  );
}

const HomeDemoContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.1);

  width: 800px;
  height: 400px;

  z-index: 9;
  display: flex;
  flex-direction: row;

  .cta {
    cursor: pointer;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    border-radius: 50%;

    background: black;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);

    width: 40px;
    height: 40px;

    /* center */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &:hover {
      box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.2);
    }

    transition: all 0.1s ease-in-out;
  }

  .panel {
    flex: 1;
    flex-direction: column;

    header,
    footer {
      flex: 1;
      height: 32px;

      button {
        cursor: pointer;

        width: 32px;
        padding: 4px;
        border: none;
        background: none;
        color: white;

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }
`;
