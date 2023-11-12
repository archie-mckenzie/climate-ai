import Header from "../../../components/Header"
import Link from "next/link"
import GreenalysisDisplay from "../../../components/GreenalysisDisplay"
import findJob from "../../../js/database/findJob"

export default async function greenalysis_from_ID({ params }) {

  const job = await findJob(params.id)

  return (
    <>
      <main>
        <Header />
        <br/>
        {job && 
        <GreenalysisDisplay job={job} /> 
        }
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
