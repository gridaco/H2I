import styled from "@emotion/styled";
import Head from "next/head";
import React from "react";
import faqs from "k/faq.json";
import { Header, HeaderSpace } from "components/header";
import { motion } from "framer-motion";
import { FaqItem } from "components/faq";

export default function FAQPage() {
  return (
    <>
      <Head>
        <title>FAQ - H2I</title>
      </Head>
      <Header />
      <Main>
        <HeaderSpace extra={80} />
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          FAQ
        </motion.h1>
        <motion.div
          className="list"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {faqs.map((_, i) => (
            <FaqItem key={i} {..._} />
          ))}
        </motion.div>
      </Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  max-width: 700px;
  margin: auto;

  h1 {
    text-align: center;
  }

  .list {
    margin-top: 64px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
`;
