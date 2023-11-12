import Header from "../../../components/Header"
import Link from "next/link"
import PastGreenalyses from "../../../components/PastGreenalyses"

export default function Greenalyses() {
  return (
    <>
      <main>
        <Header />
        <br/>
        <PastGreenalyses />
      </main>
      <footer className="links">
        <Link href='/' className='subtle-link highlighting'>🚀 Launch a new greenalysis</Link>
        <br/>
        <Link href='/team' className='subtle-link highlighting'>👷‍♂️ Meet the team</Link>
        <br/>
        ✉️ Contact us: <Link className='subtle-link highlighting' href='mailto:archie@greenalysis.org'>AM</Link>, <Link className='subtle-link highlighting' href='mailto:fernando@greenalysis.org'>FA</Link>, <Link className='subtle-link highlighting' href='mailto:ally@greenalysis.org'>AD</Link>, <Link className='subtle-link highlighting' href='mailto:benedikt@greenalysis.org'>BS</Link>
      </footer>
    </>
  )
}
