import React from 'react'

import costValue from '../../constant/costValue'
import WalletConnected from './walletConnected'
import MintConnectBtn from '../button/mintConnectBtn'
import { useAccount } from 'wagmi'
import WalletDisconnected from './walletDisconnected'
import MintBtn from '../button/mintBtn'
import TxConfirmation from './txConfirmation'
import { useMintCtx } from '../../context/mintContext'

export default function MintNFT() {
  const { isConnected } = useAccount()
  const { txSuccess } = useMintCtx()

  return (
    <>
      {!txSuccess ? (
        <div className="relative w-[400px] rounded-3xl bg-white p-6 drop-shadow-xl">
          {!isConnected && <WalletDisconnected />}
          {isConnected && <WalletConnected />}

          <section className="space-y-3">
            <div className="flex justify-between font-medium">
              <p>Amount</p>
              <p>{costValue.ether} ETH</p>
            </div>

            {!isConnected && <MintConnectBtn />}
            {isConnected && <MintBtn />}
          </section>
        </div>
      ) : (
        <TxConfirmation />
      )}
    </>
  )
}
