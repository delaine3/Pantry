import "../css/style.css";
import "../css/form.css";
import Head from "next/head";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../components/navbar";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Food App</title>
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
