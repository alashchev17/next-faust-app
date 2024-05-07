import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Tailor Swift Discography</title>
      </Head>
      <main className="layout">{children}</main>
    </>
  )
}
