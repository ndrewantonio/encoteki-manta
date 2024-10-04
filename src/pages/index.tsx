import Head from 'next/head'
import React from 'react'

export default function Home() {
  return (
    <>
      <Head>
        <title>Encoteki</title>
        <meta name="Encoteki" content="Encoteki Mint and DAO Website" />
        <meta property="og:title" content="Encoteki" />
        <meta
          property="og:description"
          content="This is the Encoteki Mint and DAO Website"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}
