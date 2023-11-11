import './stylesheet.css'

export const metadata = {
  title: 'Greenalysis',
  description: 'MIT 2023 Energy Hackathon Project',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
