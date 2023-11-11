import Link from "next/link";

export default function Footer() {
    return (
      <footer className="footer">
        <p>© {new Date().getFullYear()} <Link className='subtle-link highlighting' href='mailto:archie@greenalysis.org'>AM</Link>, <Link className='subtle-link highlighting' href='mailto:fernando@greenalysis.org'>FA</Link>, <Link className='subtle-link highlighting' href='mailto:ally@greenalysis.org'>AD</Link>, <Link className='subtle-link highlighting' href='mailto:benedikt@greenalysis.org'>BS</Link></p>
      </footer>
    );
};