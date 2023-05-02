import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "styles/Home.module.css";
import Link from "next/link";
import { HomeDemo } from "home";
import { motion } from "framer-motion";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>H2I - html to image, pdf and more</title>
        <meta name="description" content="Become a html artist" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <motion.div
          className={styles.description}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p>
            <Image
              src="/logo.svg"
              alt="Logo"
              className="logo"
              width={40}
              height={32}
              priority
            />
            Automate your artworks workflow with modern web techs
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
                width={76}
                height={24}
                priority
              />
            </a>
          </div>
        </motion.div>

        <motion.div
          className={styles.center}
          initial={{ opacity: 0.5, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
          }}
        >
          <HomeDemo />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={styles.grid}
        >
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
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Pricing <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn more about HTML2.IO pricing plans. Get started for free.
            </p>
          </Link>
        </motion.div>
      </main>
    </>
  );
}
