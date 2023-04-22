import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { useDropzone } from "react-dropzone";

export function HomeDropzone() {
  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      console.log("File dropped:", file.path);
      // Process the file here
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        width: "300px",
        textAlign: "center",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}
