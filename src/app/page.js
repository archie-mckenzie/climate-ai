
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import PDFAnalyzer from "../../components/PDFAnalyzer"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <main>
        <Header />
        <PDFAnalyzer />
      </main>
      <Footer />
    </>
  )
}
