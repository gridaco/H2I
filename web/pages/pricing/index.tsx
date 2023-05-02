import React from "react";
import styled from "@emotion/styled";
import { Header, HeaderSpace } from "components/header";
import Head from "next/head";
import { FaqItem } from "components/faq";
import { PricingCard } from "components/pricing";
import { motion } from "framer-motion";
import faqs from "k/faq.json";
import plans from "./plans.json";
import contacts from "k/contacts.json";

const price_size = {
  normal: { width: 220 } as const,
  highlighted: { width: 234, height: 340 } as const,
} as const;

export default function Pricing() {
  return (
    <>
      <Head>
        <title>Pricing - H2I</title>
      </Head>
      <Header />
      <Main>
        <HeaderSpace />
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Pricing
        </motion.h1>
        <motion.section
          className="pricing-table section"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* <PricingCard
            style={price_size.normal}
            plan="Sandbox"
            price={{
              value: "Free",
            }}
            unit={{
              value: 100,
              unit: "Images",
            }}
            desc={"Free forever."}
            action={<button onClick={() => {}}>Start Free</button>}
          /> */}
          <PricingCard
            style={price_size.normal}
            plan="Personal"
            price={{
              value: plans.personal.price.value,
              currency: plans.personal.price.symbol,
              unit: "/Mo",
            }}
            unit={{
              value: 1000,
              unit: "Images",
            }}
            desc={"$0.005 per Image"}
            action={
              <button
                onClick={() => {
                  open(plans.personal.link);
                }}
              >
                Get Started
              </button>
            }
          />
          <PricingCard
            style={price_size.highlighted}
            plan="Team"
            price={{
              value: plans.team.price.value,
              currency: plans.team.price.symbol,
              unit: "/Mo",
            }}
            unit={{
              value: 10000,
              unit: "Images",
            }}
            desc={"$0.0025 per Images"}
            action={
              <button
                onClick={() => {
                  open(plans.team.link);
                }}
              >
                Get Started
              </button>
            }
          />
          <PricingCard
            style={price_size.normal}
            plan="Business"
            price={{
              value: 300,
              currency: "$",
              unit: "/Mo",
            }}
            unit={{
              value: 150000,
              unit: "Images",
            }}
            desc={"+ $1 per 1,000 Images"}
            action={
              <button
                onClick={() => {
                  open(contacts.demo);
                }}
              >
                Contact Sales
              </button>
            }
          />
        </motion.section>
        <motion.hr
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <motion.section
          className="faq section"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            FAQ
          </motion.h2>
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
        </motion.section>
      </Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: "Inter", sans-serif;

  h1 {
    margin-top: 80px;
    font-size: 48px;
    font-weight: 700;
    text-align: center;
  }

  h2 {
    margin-top: 32px;
    text-align: center;
  }

  .pricing-table {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin-top: 32px;
  }

  hr {
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-top: 32px;
    margin-bottom: 32px;
  }

  section.section {
    padding: 32px;
  }

  section.faq {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 32px;
    width: 670px;

    .list {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 16px;
    }
  }
`;
