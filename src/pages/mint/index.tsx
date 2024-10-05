import Head from 'next/head'

import Mint from '../../components/mint'
import React from 'react'
import Navbar from '../../components/navigationBar'

export default function MintPage() {
  return (
    <>
      <Head>
        <title>Encoteki Mint</title>
        <meta name="description" content="Encoteki DAO Page" />
        <meta property="og:title" content="Encoteki Mint" />
        <meta property="og:description" content="This is the Encoteki Mint" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen flex-col bg-khaki-90 p-8">
        <Navbar />

        <main className="flex flex-1 items-center justify-center">
          <Mint />
        </main>
      </div>
    </>
  )
}
