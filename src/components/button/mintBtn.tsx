import { parseEther, parseGwei } from 'viem'
import {
  useAccount,
  useBalance,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'
import costValue from '../../constant/costValue'
import contractConfig from '../../config/contract'
import React from 'react'
import { useMintCtx } from '../../context/mintContext'

export default function MintBtn() {
  const { isConnected, address } = useAccount()
  const { data } = useBalance({
    address: address,
  })

  const { setHash, setTxSuccess, setIsSufficientFund, isSufficientFund } =
    useMintCtx()

  const {
    data: hash,
    writeContract: mint,
    isPending: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useWriteContract()

  const mintNFT = async () => {
    try {
      const isSufficientFund: boolean =
        Number(data?.value ?? 0) >= parseGwei(costValue.gwei)

      setIsSufficientFund(isSufficientFund)

      if (isSufficientFund) {
        mint({
          ...contractConfig,
          functionName: 'mint',
          args: [],
          value: parseEther(costValue.ether),
        })
      }
    } catch (error) {
      console.error('Minting failed:', error)
      throw error
    }
  }

  const { isSuccess: txSuccess, error: txError } = useWaitForTransactionReceipt(
    {
      hash,
    },
  )

  if (txSuccess) {
    setHash(hash)
    setTxSuccess(true)
  } else {
    setTxSuccess(false)
  }

  return (
    <>
      {isConnected && !txSuccess && (
        <button
          disabled={
            !mint || isMintLoading || isMintStarted || !isSufficientFund
          }
          className={`w-full rounded-[32px] ${!isSufficientFund ? 'bg-neutral-60' : 'bg-primary-green hover:bg-green-900'} py-3`}
          data-mint-loading={isMintLoading}
          data-mint-started={isMintStarted}
          onClick={mintNFT}
        >
          <span className="font-medium text-white">
            {isMintLoading && 'Waiting...'}
            {isMintStarted && 'Minting...'}
            {!isMintLoading && !isMintStarted && 'Mint'}
            {mintError && txError && 'Try Again'}
          </span>
        </button>
      )}
    </>
  )
}
