import "../css/style.css";
import "../css/form.css";
import Head from "next/head";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Food App</title>
      </Head>

      <div className="top-bar">
        <div style={{ backgroundColor: "aliceblue" }} className="nav">
          <div className="nav-link">
            <Link href="/">
              <a style={{ textDecoration: "none" }}>Pantry</a>
            </Link>
          </div>
          <div className="nav-link">
            <Link href="/shoppinglistItems">
              <a style={{ textDecoration: "none" }}>Shopping List</a>
            </Link>
          </div>
        </div>
      </div>
      <div className="grid wrapper">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
