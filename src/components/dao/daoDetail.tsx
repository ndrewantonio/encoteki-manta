import { useEffect, useState } from 'react'
import calculateDayDifference from '../../service/calculateDayDiffs'
import { useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useDaoCtx } from '../../context/daoContext'
import Link from 'next/link'

type DAODetailResponse = {
  dao_id: number
  dao_name: string
  dao_content: string
  start_date: string
  end_date: string
}

type OptionsResponse = {
  option_id: number
  option_name: string
  dao_id: number
}

type SubmitVoteDto = {
  nft_id: number
  dao_id: number
  option_id?: number
  isNeutral: boolean
}

export default function DAODetail({
  daoId,
  daoDetail,
}: {
  daoId: number
  daoDetail: DAODetailResponse
}) {
  const { nftCollection } = useDaoCtx()

  // Wallet
  const { openConnectModal } = useConnectModal()
  const { isConnected } = useAccount()
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  const address: string = '0x1c3294B823cF9ac62940c64E16bce6ebAf7dca5B'

  const [voteCount, setVoteCount] = useState<number>(0)
  const [availableNFTIds, setAvailableNFTIds] = useState<Array<any>>([])
  const [isSubmitVote, setIsSubmitVote] = useState<boolean>(false)
  const [isNoVote, setIsNoVote] = useState<Boolean>(false)

  useEffect(() => {
    const fetchNftColl = async () => {
      const nftCount: Set<number> = new Set()

      if (address) {
        const response = await fetch(
          `https://manta-sepolia.explorer.caldera.xyz/api/v2/addresses/${address}/nft/collections?type=ERC-721%2CERC-404%2CERC-1155`,
        )

        if (!response.ok) {
          throw new Error('Failed to Fetch API')
        }

        const data = await response.json()

        if (data && Array.isArray(data.items)) {
          // If NFT on Encoteki > 0
          if (data.items.length > 0) {
            // Filter Encoteki Contract Address
            const filteredItems = data.items.filter(
              (item: any) => item.token.address === contractAddress,
            )

            if (Array.isArray(filteredItems[0].token_instances)) {
              for (const item of [
                ...filteredItems[0].token_instances,
              ].reverse()) {
                nftCount.add(item.id)
                nftCollection.add(item.id)
              }
            }
          }
        } else {
          console.error('Items is not an array or is undefined.')
        }

        return nftCount
      } else {
        console.error('Address is undefined')
      }
    }

    const getVotes = async (nfts: Set<number>) => {
      const arrayNfts: Array<number> = []
      for (const nft of nfts) {
        arrayNfts.push(nft)
      }

      const usedNfts: Array<any> = []
      const response = await fetch(`/api/get-votes-count?id=${daoId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nfts: arrayNfts }),
      })

      const result = await response.json()

      if (result.data && Array.isArray(result.data)) {
        for (const data of result.data) {
          usedNfts.push(String(data.nft_id))
        }

        const filteredArray = arrayNfts.filter(
          (item) => !usedNfts.includes(item),
        )

        if (filteredArray.length == 0) {
          setIsNoVote(true)
        }

        setAvailableNFTIds(filteredArray)
      } else {
        console.error('result.data is not an array or is undefined.')
      }

      setVoteCount(result.voteCount)
    }

    const loadData = async () => {
      if (isConnected) {
        const nfts = await fetchNftColl()
        if (nfts) {
          getVotes(nfts)
        }
      }
    }

    loadData()
  }, [address, isConnected, daoId])

  // Initial Data Fetch
  const [options, setOptions] = useState<OptionsResponse[]>([])
  const [isLoading, setIsLoading] = useState<Boolean>(true)

  useEffect(() => {
    const fetchDaoOptions = async () => {
      try {
        const response = await fetch(`/api/get-dao-option?id=${daoId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch DAO Options')
        }
        const result = await response.json()

        setOptions(result.data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDaoOptions()
  }, [daoId])

  // Handle Click Options
  const [isClickedOption, setIsClickedOption] = useState<number>(0)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  const handleClick = (index: number) => {
    setIsClickedOption(index)
    setIsButtonDisabled(false)
  }

  // Submit Vote
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitVote = async () => {
    const req: SubmitVoteDto = {
      nft_id: Number(availableNFTIds[0]),
      dao_id: daoId,
      option_id: isClickedOption,
      isNeutral: false,
    }

    try {
      const response = await fetch('/api/submit-vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
      })

      if (!response.ok) {
        throw new Error('Failed to create vote')
      }

      const data = await response.json()
      setIsSubmitVote(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const submitVoteNeutral = async () => {
    const req: SubmitVoteDto = {
      nft_id: Number(availableNFTIds[0]),
      dao_id: daoId,
      option_id: undefined,
      isNeutral: true,
    }

    try {
      const response = await fetch('/api/submit-vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
      })

      if (!response.ok) {
        throw new Error('Failed to create vote')
      }

      const data = await response.json()
      setIsSubmitVote(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative w-[912px] space-y-12">
      <header className="space-y-2">
        <h1 className="text-5xl font-medium">{daoDetail.dao_name}</h1>
        <div className="font-base flex justify-between">
          <p className="text-neutral-10">
            Voting ends in {calculateDayDifference(daoDetail.end_date)}
            {calculateDayDifference(daoDetail.end_date) > 1 ? ' days' : ' day'}
          </p>
          <p className="text-neutral-30">
            {calculateDayDifference(daoDetail.start_date)}
            {calculateDayDifference(daoDetail.start_date) > 1
              ? ' days ago'
              : ' day ago'}
          </p>
        </div>
      </header>

      <main className="flex h-auto gap-12">
        {/* Left Content of DAO */}
        <section className="flex h-full w-[416px] flex-col justify-between gap-10 rounded-[32px] bg-white p-8">
          <div className="space-y-6">
            {isSubmitVote ? (
              <div className="space-y-1">
                <h1 className="text-2xl font-medium">Thanks for voting!</h1>
                <p className="text-neutral-30">
                  You have casted all your votes
                </p>
              </div>
            ) : (
              <h1 className="text-2xl font-medium">Options:</h1>
            )}

            {!isSubmitVote ? (
              <div className="flex flex-col gap-3">
                {options.map((option) => {
                  return (
                    <div
                      key={option.option_id}
                      onClick={() => handleClick(option.option_id)}
                      className={`${isClickedOption === option.option_id ? 'border-primary-green' : 'border-gray-300'} cursor-pointer rounded-[100px] border bg-white py-3 text-center duration-300`}
                    >
                      <p className="w-full">{option.option_name}</p>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="">
                Thank you for your vote! Your contribution is helping us make a
                real difference, no matter the cause. We’ll keep you updated on
                the results and how your choice will impact our mission.
                Together, we can drive meaningful change for the environment and
                our communities. Stay tuned for more updates and ways to stay
                involved!
              </div>
            )}
          </div>

          {/* Bottom Section */}
          <footer className="">
            {isConnected ? (
              <div>
                {nftCollection.size > 0 ? (
                  <div>
                    {!isNoVote ? (
                      <div className={`${isSubmitVote ? 'hidden' : 'block'}`}>
                        <p className="p-4">You have {voteCount} vote left</p>
                        <button
                          onClick={() => submitVote()}
                          disabled={Boolean(isButtonDisabled)}
                          className={`w-full rounded-[32px] ${isButtonDisabled ? 'cursor-not-allowed bg-gray-500' : 'cursor-pointer bg-primary-green'} hover:${isButtonDisabled ? '' : 'bg-green-900'} py-4`}
                        >
                          <span className="text-white">Vote</span>
                        </button>
                        <button
                          onClick={() => submitVoteNeutral()}
                          className="w-full rounded-[32px] bg-white py-4"
                        >
                          <span className="text-primary-green">
                            Remain Neutral
                          </span>
                        </button>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                ) : (
                  <div className="">
                    <p>You must own an Encoteki NFT to vote. </p>
                    <Link href="/mint">
                      <span className="text-primary-green">Mint now</span>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <p>
                  Connect wallet to vote.{' '}
                  <span
                    onClick={openConnectModal}
                    className="cursor-pointer text-primary-green"
                  >
                    Connect wallet
                  </span>
                </p>
              </div>
            )}
          </footer>
        </section>

        {/* // Right Content of DAO */}
        <section className="w-[calc(912px-426px)]">
          <p className="text-justify">{daoDetail.dao_content}</p>
        </section>
      </main>
    </div>
  )
}
