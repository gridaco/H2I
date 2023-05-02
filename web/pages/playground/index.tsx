import Head from "next/head";
import React from "react";
import { Editor } from "@monaco-editor/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { demo_src } from "home/k";

export default function Playground() {
  const [html, setHtml] = React.useState<string>(demo_src.value);

  return (
    <>
      <Head>
        <title>Playground - H2I</title>
      </Head>
      <Main>
        <div className="panel">
          <header></header>
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
          <motion.iframe
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            srcDoc={html}
          />
        </div>
      </Main>
    </>
  );
}

const Main = styled.main`
  background-color: #1e1e1e;

  display: flex;
  flex-direction: row;
  .panel {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100vh;

    header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 8px;

      color: #fff;
      min-height: 32px;
    }
  }

  iframe {
    background: white;
    border-radius: 8px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    margin: 24px;
    /* width: 100%; */
    height: 100%;
    border: none;
  }
`;
