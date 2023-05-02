import styled from "@emotion/styled";
import Head from "next/head";
import React from "react";

export default function TemplateDetailPage({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  return (
    <>
      <Head>
        <title>{name} - H2I Templates</title>
      </Head>
      <Main>
        <h1>Template {id}</h1>
      </Main>
    </>
  );
}

const Main = styled.main``;

export function getStaticProps(context) {
  const { id } = context.params;

  return {
    props: {
      id,
      name: "Template Name",
    },
  };
}

export function getStaticPaths() {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
      { params: { id: "4" } },
      { params: { id: "5" } },
      { params: { id: "6" } },
      { params: { id: "7" } },
      { params: { id: "8" } },
      { params: { id: "9" } },
      { params: { id: "10" } },
    ],
    fallback: false,
  };
}
