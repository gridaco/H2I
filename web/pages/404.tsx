import { Header } from "components/header";
import Error from "next/error";
import Head from "next/head";

export default function NotFoundErrorPage() {
  return (
    <>
      <Header />
      <Error statusCode={404} />
    </>
  );
}
