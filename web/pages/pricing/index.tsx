import React from "react";
import styled from "@emotion/styled";
import { Header, HeaderSpace } from "components/header";
import Head from "next/head";
import { FaqItem } from "components/faq";
import { PricingCard } from "components/pricing";

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
        <h1>Pricing</h1>
        <section className="pricing-table section">
          <PricingCard
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
            action={<button>Start Free</button>}
          />
          <PricingCard
            style={price_size.normal}
            plan="Personal"
            price={{
              value: 5,
              currency: "$",
              unit: "/Mo",
            }}
            unit={{
              value: 1000,
              unit: "Images",
            }}
            desc={"$0.005 per Image"}
            action={<button>Get Started</button>}
          />
          <PricingCard
            style={price_size.highlighted}
            plan="Team"
            price={{
              value: 25,
              currency: "$",
              unit: "/Mo",
            }}
            unit={{
              value: 10000,
              unit: "Images",
            }}
            desc={"$0.0025 per Images"}
            action={<button>Get Started</button>}
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
            action={<button>Contact Sales</button>}
          />
        </section>
        <hr />
        <section className="faq section">
          <h2>FAQ</h2>
          {[1, 2, 3].map((_, i) => (
            <FaqItem key={i} />
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

  color: white;
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
  }
`;
