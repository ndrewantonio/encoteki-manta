import Head from 'next/head'
import React from 'react'
import Navbar from '../../components/navigationBar'
import DAO from '../../components/dao'

export default function DAOPage() {
  return (
    <>
      <Head>
        <title>Encoteki DAO</title>
        <meta name="description" content="Encoteki DAO Page" />
        <meta property="og:title" content="Encoteki DAO" />
        <meta property="og:description" content="This is the Encoteki DAO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen flex-col bg-khaki-90 p-8">
        <Navbar />

        <main className="flex flex-1 items-center justify-center">
          <DAO />
        </main>
      </div>
    </>
  )
}
