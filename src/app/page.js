
import Header from "../../components/Header"
import PDFAnalyzer from "../../components/PDFAnalyzer"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <main>
        <Header />
        <PDFAnalyzer />
      </main>
      <footer className="links">
        <Link href='/greenalyses' className='subtle-link highlighting'>✅ See completed greenalyses</Link>
        <br/>
        <Link href='/team' className='subtle-link highlighting'>👷‍♂️ Meet the team</Link>
        <br/>
        ✉️ Contact us: <Link className='subtle-link highlighting' href='mailto:archie@greenalysis.org'>AM</Link>, <Link className='subtle-link highlighting' href='mailto:fernando@greenalysis.org'>FA</Link>, <Link className='subtle-link highlighting' href='mailto:ally@greenalysis.org'>AD</Link>, <Link className='subtle-link highlighting' href='mailto:benedikt@greenalysis.org'>BS</Link>
      </footer>
    </>
  )
}
