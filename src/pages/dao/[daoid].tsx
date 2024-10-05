import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState } from 'react'
import Navbar from '../../components/navigationBar'
import DAODetail from '../../components/dao/daoDetail'

type DAODetailResponse = {
  dao_id: number
  dao_name: string
  dao_content: string
  start_date: string
  end_date: string
}

const defaultDao: DAODetailResponse = {
  dao_id: 0,
  dao_name: '',
  dao_content: '',
  start_date: '',
  end_date: '',
}

export default function DAODetailPage() {
  const { query, isReady } = useRouter()
  const [dao, setDao] = useState<DAODetailResponse>(defaultDao)

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await fetch(`/api/get-dao-detail?id=${query.daoid}`)

        if (!response.ok) {
          throw new Error('Failed to fetch DAO Detail')
        }
        const result = await response.json()

        setDao(result.data[0])
      } catch (error) {
        console.error(error)
      }
    }

    fetchSubject()
  }, [isReady, query.daoid])

  return (
    <>
      <Head>
        <title>{dao.dao_name}</title>
        <meta name="description" content="Encoteki DAO Page" />
        <meta property="og:title" content="Encoteki Mint" />
        <meta property="og:description" content="This is the Encoteki Mint" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen flex-col bg-khaki-90 p-8">
        <Navbar />

        <main className="flex flex-1 items-center justify-center">
          <DAODetail daoId={Number(query.daoid)} daoDetail={dao} />
        </main>
      </div>
    </>
  )
}
