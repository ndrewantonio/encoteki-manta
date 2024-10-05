import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import calculateDayDifference from '../../service/calculateDayDiffs'

type DAO = {
  dao_id: string
  dao_name: string
  start_date: string
  end_date: string
}

export default function DAO() {
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const [daoList, setDaoList] = useState<DAO[]>([])
  const [isExpired, setIsExpired] = useState<Date>(new Date)

  // Fetch get DAO List
  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await fetch('/api/get-dao-list')

        if (!response.ok) {
          throw new Error('Failed to fetch DAO List')
        }

        const result = await response.json()

        setDaoList(result.data)
      } catch (err) {
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubject()
  }, [])

  return (
    <div className="flex h-auto flex-col bg-khaki-90 p-8">
      <main className="flex flex-1 items-center justify-center">
        <div className="relative w-[912px] space-y-12">
          <header className="space-y-[18px]">
            <h1 className="text-5xl font-medium">Encoteki DAO</h1>
            <p className="text-lg">
              Encoteki governs the Encoteki DAO. Owning an NFT allows you to
              vote on our proposals, with the results determining the direction
              of Encoteki’s future initiatives.
            </p>
          </header>

          <main className="">
            {isLoading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <div className="flex flex-col gap-8">
                {daoList.map((dao, index) => {
                  return (
                    <Link key={index} href={`/dao/${dao.dao_id}`}>
                      <section className="w-full cursor-pointer rounded-[32px] bg-white p-6">
                        <div className="space-y-1">
                          <h1 className="text-2xl font-medium">
                            {dao.dao_name}
                          </h1>
                          <div className="font-base flex justify-between">
                            <p>
                              Voting ends in{' '}
                              {calculateDayDifference(dao.end_date)}
                              {calculateDayDifference(dao.end_date) > 1
                                ? ' days'
                                : ' day'}
                            </p>
                            <p>
                              {calculateDayDifference(dao.start_date)}
                              {calculateDayDifference(dao.start_date) > 1
                                ? ' days ago'
                                : ' day ago'}
                            </p>
                          </div>
                        </div>
                      </section>
                    </Link>
                  )
                })}
              </div>
            )}
          </main>
        </div>
      </main>
    </div>
  )
}
