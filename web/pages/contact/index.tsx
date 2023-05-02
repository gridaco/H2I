import React from "react";
import Head from "next/head";
import { Header, HeaderSpace } from "components/header";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact - H2I</title>
      </Head>
      <Header />
      <main style={{ textAlign: "center" }}>
        <HeaderSpace extra={80} />
        <h1>Contact Us</h1>
        <section
          style={{
            marginTop: 80,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <Link href="hello@grida.co">
            <h2>hello@grida.co</h2>
          </Link>
          <Link href="https://cal.com/universe-from-grida/15min">
            <h2>book a meeting</h2>
          </Link>
        </section>
      </main>
    </>
  );
}
