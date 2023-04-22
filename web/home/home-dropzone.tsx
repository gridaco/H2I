import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { useDropzone } from "react-dropzone";

export function HomeDropzone() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => {},
    onDragLeave: () => {},
    multiple: true,
    accept: {
      "text/html": [".html", ".htm"],
    },
  });

  return (
    <Dropzone {...getRootProps()}>
      <input
        style={{
          width: "100%",
          height: "100%",
        }}
        {...getInputProps()}
      />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </Dropzone>
  );
}

const Dropzone = styled.div`
  width: 100%;
  height: 100%;
  border: 2px dashed #ccc;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
