import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>HTML2.IO - html to image, pdf and more</title>
        <meta name="description" content="Become a html artist" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            <code className={styles.code}>HTML2.IO</code> Automate your artworks
            workflow with modern web techs
          </p>
          <div>
            <a
              href="https://grida.co?utm_source=html2.io"
              target="_blank"
              rel="noopener"
            >
              By{" "}
              <Image
                src="/grida.svg"
                alt="Grida Logo"
                className={styles.gridaLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>Drop your html file here</div>

        <div className={styles.grid}>
          <Link
            href="/docs"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about HTML2 features and&nbsp;API.
            </p>
          </Link>

          <Link
            href="/playground"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Playground <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Design your artwork in interactive playground with visual canvas
            </p>
          </Link>

          <Link
            href="/templates"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example artworks.
            </p>
          </Link>

          <Link
            href="/pricing"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Pricing <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn more about HTML2.IO pricing plans. Get started for free.
            </p>
          </Link>
        </div>
      </main>
    </>
  );
}
