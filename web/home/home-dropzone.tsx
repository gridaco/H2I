import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { useDropzone } from "react-dropzone";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export function HomeDemoDropzone() {
  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      // read file
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const txt = reader.result;
        // call the api with the file content
      };

      reader.readAsText(file);
    });
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: {
      "text/html": [".html", ".htm"],
    },
  });

  return (
    <DropZone
      className={inter.className}
      {...getRootProps()}
      data-is-drag-active={isDragActive}
      data-is-drag-accept={isDragAccept}
      data-is-drag-reject={isDragReject}
      data-rejected={fileRejections.length > 0}
    >
      <input {...getInputProps()} />
      <p>Drop or select your html file</p>
    </DropZone>
  );
}

const DropZone = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px;
  width: 100%;
  height: 100%;
  text-align: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(16px);

  &[data-is-drag-active="true"] {
    border-color: #000;
  }

  &[data-is-drag-reject="true"] {
    border-color: #f00;
  }

  &[data-rejected="true"] {
    border-color: #f00;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
`;
