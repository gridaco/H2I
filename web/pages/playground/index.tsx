import Head from "next/head";
import React from "react";
import { Editor } from "@monaco-editor/react";
import styled from "@emotion/styled";

export default function Playground() {
  const [html, setHtml] = React.useState("");

  return (
    <>
      <Head>
        <title>Playground - H2I</title>
      </Head>
      <Main>
        <div className="panel">
          <Editor
            theme="vs-dark"
            language="html"
            options={{
              automaticLayout: true,
            }}
            value={html}
            onChange={(value) => setHtml(value)}
          />
        </div>
        <div className="panel">
          <iframe srcDoc={html} />
        </div>
      </Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: row;
  .panel {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    height: 100vh;
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;
