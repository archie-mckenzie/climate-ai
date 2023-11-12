import Header from "../../../components/Header"
import Link from "next/link"

export default function Greenalyses() {
  return (
    <>
      <main>
        <Header />
        <br/>
        <div className='links'>
        <p>
            Ally Darnton
            <br/>
            Material Science @ MIT, Oxford
        </p>
        <p>
            Fernando Aviles
            <br/>
            Computer Science @ Princeton
        </p>
        <p>
            Benedikt Schultes
            <br/>
            Material Science @ MIT, Imperial
        </p>
        <p>
            Archie McKenzie
            <br/>
            Computer Science @ Princeton
        </p>
        </div>
      </main>
      <footer className="links">
        <Link href='/' className='subtle-link highlighting'>🚀 Launch a new greenalysis</Link>
        <br/>
        <Link href='/greenalyses' className='subtle-link highlighting'>✅ See completed greenalyses</Link>
        <br/>
        ✉️ Contact us: <Link className='subtle-link highlighting' href='mailto:archie@greenalysis.org'>AM</Link>, <Link className='subtle-link highlighting' href='mailto:fernando@greenalysis.org'>FA</Link>, <Link className='subtle-link highlighting' href='mailto:ally@greenalysis.org'>AD</Link>, <Link className='subtle-link highlighting' href='mailto:benedikt@greenalysis.org'>BS</Link>
      </footer>
    </>
  )
}
