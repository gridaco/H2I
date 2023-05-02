import React, { useCallback, useEffect, useRef } from "react";
import * as H2I from "h2i";
import styled from "@emotion/styled";
import { Editor } from "@monaco-editor/react";
import { PlayIcon, UploadIcon, Cross2Icon } from "@radix-ui/react-icons";
import { demo_src } from "./k";
import { motion } from "framer-motion";
import { FuseBorder } from "components/fx";

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

type DemoMode = "html" | "js" | "url" | "csb";

const mode_acceptable_files = {
  html: [".html", ".htm"],
  js: [".js"],
} as const;

export function HomeDemo() {
  const [idle, setIdle] = React.useState(false);
  const [mode, setMode] = React.useState<DemoMode>(demo_src.language);
  const [code, setCode] = React.useState<string | null>(demo_src.value);
  const [src, setSrc] = React.useState<string | null>();
  const [language, setLanguage] = React.useState<"html" | "js" | "txt">(
    demo_src.language,
  );
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    // first load
    setTimeout(() => {
      setIdle(true);
    }, 500);

    setTimeout(() => {
      setIdle(false);
      setSrc(demo_src.img);
    }, 1000);
  }, []);

  const triggerFileSelect = (event) => {
    fileInputRef?.current?.click();
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setCode(event.target.result as string);
    };
    reader.readAsText(file);
  };

  const onCancel = () => {
    setIdle(false);
  };

  const onCTA = useCallback(() => {
    switch (mode) {
      case "html": {
        setIdle(true);
        img
          .fromHtml(code)
          .then(({ data }) => {
            setSrc(data.url);
          })
          .finally(() => {
            setIdle(false);
          });
        break;
      }
      default: {
        throw new Error("Not implemented");
      }
    }
  }, [mode, code]);

  const onCTARef = useRef(onCTA); // Add this line

  useEffect(() => {
    onCTARef.current = onCTA; // Update onCTARef on every render
  }, [onCTA]);

  useEffect(() => {
    if (!code) {
      return;
    }
  }, [code, mode]);

  if (mode === "csb") {
    return (
      <HomeDemoContainer>
        <CSB />
      </HomeDemoContainer>
    );
  }

  return (
    <FuseBorder enabled={idle} borderWidth={2}>
      <HomeDemoContainer>
        <section className="panel" style={{ background: "#1E1E1E" }}>
          <header></header>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ height: "100%" }}
          >
            <DemoEditor
              value={code}
              onChange={setCode}
              language={language}
              onCTA={() => onCTARef.current()}
            />
          </motion.div>
          <footer className="fixed">
            <button onClick={triggerFileSelect}>
              <UploadIcon />
              <input
                ref={fileInputRef}
                onChange={onFileChange}
                type="file"
                accept={mode_acceptable_files[mode].join(",")}
                style={{ display: "none" }}
              />
            </button>
            <div style={{ flex: 1 }} />
            <code>{language}</code>
          </footer>
        </section>
        <button
          onClick={idle ? onCancel : onCTA}
          className="cta"
          data-inverted={idle}
        >
          {idle ? <Cross2Icon /> : <PlayIcon />}
        </button>
        <section className="panel scroll" style={{ background: "#aeaeae" }}>
          <motion.div
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(4px)",
            }}
          />
          {src && <SmoothImage src={src} alt="H2I result" width="100%" />}
        </section>
        {/* <HomeDemoDropzone onHtml={setHtml} /> */}
      </HomeDemoContainer>
    </FuseBorder>
  );
}

function DemoEditor({
  value,
  onChange,
  language,
  onCTA,
}: {
  value: string;
  onChange: (value: string) => void;
  language: "html" | "js" | "txt";
  onCTA: () => void;
}) {
  const handleEditorDidMount = (editor, monaco) => {
    editor.onKeyDown((e) => {
      if (e.metaKey && e.keyCode === monaco.KeyCode.Enter) {
        // when Meta+Enter (CMD+Enter) is pressed
        onCTA();
        e.stopPropagation();
      }
    });
  };

  return (
    <Editor
      theme="vs-dark"
      loading={<></>}
      value={value}
      onChange={onChange}
      language={language}
      onMount={handleEditorDidMount}
      options={{
        // minimal
        minimap: { enabled: false },
        // lineNumbers: "off",
        scrollBeyondLastLine: false,
        scrollbar: { vertical: "hidden" },
        overviewRulerBorder: false,
        overviewRulerLanes: 0,
        renderLineHighlight: "none",
        renderIndentGuides: false,
        renderLineHighlightOnlyWhenFocus: true,
        hideCursorInOverviewRuler: true,
        renderValidationDecorations: "on",
        renderWhitespace: "none",
        renderControlCharacters: false,
        renderFinalNewline: false,
      }}
    />
  );
}

function SmoothImage({
  src,
  alt,
  width,
  height,
  duration = 1,
}: {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  duration?: number;
}) {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <motion.img
      key={src}
      src={src}
      alt={alt}
      width={width}
      height={height}
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      transition={{ duration }}
      onLoad={() => {
        console.log("loaded");
        setLoaded(true);
      }}
    />
  );
}

const HomeDemoContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid rgba(var(--foreground-rgb), 0.1);

  width: 800px;
  height: 400px;

  z-index: 9;
  display: flex;
  flex-direction: row;

  .cta {
    --shadow-color-1: rgba(var(--foreground-rgb), 0.1);
    --shadow-color-2: rgba(var(--foreground-rgb), 0.2);

    &[data-inverted="true"] {
      background: white;
      color: black;
      --shadow-color-1: rgba(var(--foreground-inverted-rgb), 0.2);
      --shadow-color-2: rgba(var(--foreground-inverted-rgb), 0.4);
    }
    color: white;

    z-index: 9;
    cursor: pointer;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    border-radius: 50%;

    background: black;
    box-shadow: 0 0 0 2px var(--shadow-color-1);

    width: 40px;
    height: 40px;

    /* center */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &:hover {
      box-shadow: 0 0 0 4px var(--shadow-color-2);
    }

    transition: all 0.1s ease-in-out;
  }

  .panel {
    position: relative;
    flex: 1;
    flex-direction: column;

    header,
    footer {
      flex: 1;
      align-self: stretch;
      min-height: 32px;

      display: flex;
      align-items: center;
      justify-content: start;

      padding: 4px 8px;

      background: rgba(0, 0, 0, 0.01);
      backdrop-filter: blur(16px);

      button {
        cursor: pointer;

        width: 32px;
        padding: 4px;
        border: none;
        background: none;
        color: white;
        border-radius: 4px;

        outline: 0px solid transparent;

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        &:focus,
        &:active {
          outline: 1px solid rgba(255, 255, 255, 0.2);
        }

        transition: all 0.1s ease-in-out;
      }

      code {
        padding: 2px;
        user-select: none;
        opacity: 0.5;
        font-size: 12px;
      }
    }
  }

  footer {
    z-index: 1;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .scroll {
    overflow: scroll;
  }
`;
