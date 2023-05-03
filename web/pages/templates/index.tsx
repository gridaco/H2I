import styled from "@emotion/styled";
import { Header, HeaderSpace } from "components/header";
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
      <Header />
      <Main>
        <HeaderSpace extra={60} />
        <header className="header">
          <h1>H2I Templates</h1>
          <p>From Social cards to Short forms, we have it here for you</p>
        </header>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;

  max-width: 1040px;
  margin: auto;

  header.header {
    display: flex;
    flex-direction: column;
    align-items: center;

    max-width: 330px;
    text-align: center;

    h1 {
      font-size: 40px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    p {
      font-size: 18px;
      opacity: 0.5;
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 220px);
    grid-gap: 21px;
  }

  .search {
    width: 560px;
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

  section {
    padding: 24px;
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
      shallow
      href={{
        pathname: "/templates/[id]",
        query: { id },
      }}
    >
      <TemplateCardWrapper>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://i.pinimg.com/736x/56/d7/5f/56d75f99f82620f64895c8f81592fd89.jpg"
          alt="Template Image"
        />
        <div>Template Name</div>
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
