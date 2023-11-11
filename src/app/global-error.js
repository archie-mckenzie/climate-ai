'use client'

import Link from "next/link"
 
export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <main>
          <div style={{"height": "15vh"}}></div> 
          <h1>Something went wrong!</h1>
          <Link href='/'>Return to Homepage?</Link>
        </main>
        
      </body>
    </html>
  )
}