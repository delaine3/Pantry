import Link from "next/link";

export default function Navbar() {
  return (
    <div className="nav-bar">
      <nav>
     
        <Link href="/">
              <a className="">Pantry</a>
            </Link>
            <Link href="/shoppinglistItems">
              <a className="">Shopping List</a>
            </Link>
            <a
          id="portfolio"
          href="https://delaine-abner-portfolio.vercel.app/"
        >
          Back to Portfolio
        </a>
      </nav>
      
    </div>
  );
}
