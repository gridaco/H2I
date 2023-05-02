import styled from "@emotion/styled";
import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function Templates() {
  return (
    <>
      <Head>
        <title>Templates - H2I</title>
        <meta name="description" content="H2I Templates Library" />
      </Head>
      <Main>
        <h1>Templates</h1>
        <section className="search">
          <input placeholder="Search" />
          <div className="tags">
            {[1, 2, 3, 4].map(() => (
              <>
                <Tag />
              </>
            ))}
          </div>
        </section>
        <section className="grid">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((p, i) => (
            <>
              <TemplateCard key={i} id={p.toString()} />
            </>
          ))}
        </section>
      </Main>
    </>
  );
}

const Main = styled.main`
  h1 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 24px;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 24px;
  }

  .search {
    width: 100%;
    display: flex;
    flex-direction: column;

    input {
      width: 100%;
      height: 40px;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 8px;
      margin-bottom: 8px;
    }

    .tags {
      display: flex;
      flex-direction: row;
      gap: 8px;
    }
  }
`;

function Tag() {
  return <TagWrapper>Tag</TagWrapper>;
}

const TagWrapper = styled.button`
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 4px 8px;
`;

function TemplateCard({ id }: { id: string }) {
  return (
    <Link
      href={{
        pathname: "/templates/[id]",
        query: { id },
      }}
    >
      <TemplateCardWrapper>
        <img
          src="https://i.pinimg.com/736x/56/d7/5f/56d75f99f82620f64895c8f81592fd89.jpg"
          alt="Template Image"
        />
        <div>Template Image</div>
        <div>Template Name</div>
        <div>Template Description</div>
        <div>Template Tags</div>
      </TemplateCardWrapper>
    </Link>
  );
}

const TemplateCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;

  max-width: 300px;
  max-height: 400px;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

export function getStaticProps() {
  return {
    props: {},
  };
}
