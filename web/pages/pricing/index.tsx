import styled from "@emotion/styled";
import Head from "next/head";
import React from "react";

export default function Pricing() {
  return (
    <>
      <Head>
        <title>Pricing - H2I</title>
      </Head>
      <Main>
        <h1>Pricing</h1>
        <section className="pricing-table section">
          <PricingCard
            style={{ width: 220 }}
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
            style={{ width: 234, height: 340 }}
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
            style={{ width: 220 }}
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
            style={{ width: 220 }}
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

export function PricingCard({
  plan,
  price,
  unit,
  desc,
  action,
  style = {},
}: {
  plan: string;
  price: {
    value: number | string;
    currency?: string;
    unit?: string;
  };
  unit: {
    value: number;
    unit: string;
  };
  desc: string;
  action?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <PricingCardWrapper style={style}>
      <span className="plan">{plan}</span>
      <section>
        <span className="price">
          <span className="a">
            {typeof price.value === "string"
              ? price.value
              : `${price.currency}${price.value}`}
          </span>
          <span className="b">{price.unit}</span>
        </span>
        <span className="unit">
          <span className="a">{unit.value.toLocaleString()}</span>
          <span className="b">{unit.unit}</span>
        </span>
      </section>
      <section>
        <span className="desc">{desc}</span>
      </section>
      <div style={{ minHeight: 60, flex: 1 }} />
      {action}
      <span className="dot" />
    </PricingCardWrapper>
  );
}

const PricingCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: solid 2px rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  position: relative;

  color: white;
  font-family: Inter, sans-serif;
  text-align: left;

  section {
    margin-top: 32px;
  }

  .plan {
    font-size: 14px;
    font-weight: 500;
  }

  .price {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    flex: none;
    gap: 2px;
    box-sizing: border-box;

    .a {
      font-size: 32px;
      font-weight: 800;
    }

    .b {
      font-size: 13px;
      font-weight: 500;
      opacity: 0.5;
    }
  }

  .unit {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    flex: none;
    gap: 4px;
    box-sizing: border-box;
    opacity: 0.8;

    .a {
      font-size: 21px;
      font-weight: 700;
    }

    .b {
      font-size: 13px;
      font-weight: 500;
      opacity: 0.5;
    }
  }

  .desc {
    font-size: 13px;
    font-weight: 500;
    text-align: left;
    opacity: 0.5;
  }

  button {
    height: 31px;
    box-shadow: 0px 4px 24px 2px rgba(255, 255, 255, 0.2);
    background: linear-gradient(
      90deg,
      rgb(237, 237, 237),
      rgba(255, 255, 255, 0.77)
    );
    border: solid 1px rgba(120, 120, 120, 0.8);
    border-radius: 4px;
    padding: 8px 10px;
    color: black;
    font-size: 12px;
    font-weight: 600;
    outline: none;
    cursor: pointer;

    :hover {
      opacity: 0.8;
    }

    :disabled {
      opacity: 0.5;
    }

    :active {
      opacity: 1;
    }

    :focus {
    }
  }

  .dot {
    width: 8px;
    height: 8px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

function FaqItem() {
  return (
    <FaqItemWrapper>
      <summary className="question">
        What is the difference between a user and a member?
      </summary>
      <details className="answer">
        A user is a person who can log in to your workspace. A member is a
        person who can access a specific project. A user can be a member, but a
        member doesn’t have to be a user.
      </details>
    </FaqItemWrapper>
  );
}

const FaqItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: solid 2px rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  position: relative;

  color: white;

  .question {
    font-size: 14px;
    font-weight: 500;
  }

  .answer {
    font-size: 13px;
    font-weight: 500;
    text-align: left;
    opacity: 0.5;
  }
`;
