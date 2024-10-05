import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import Image from 'next/image'
import Error from '../../assets/icon/error.png'
import { useMintCtx } from '../../context/mintContext'

export default function WalletConnected() {
  const { isConnected } = useAccount()
  const { isSufficientFund } = useMintCtx()

  return (
    <div className="pb-8">
      <header className="pb-6">
        <h1 className="text-lg font-medium">Pay</h1>
      </header>

      <div className="border-t-2 border-neutral-70"></div>

      {isConnected && (
        <section className="w-full pt-6">
          <div
            className={`bg-red-90 mb-8 flex gap-2 rounded-xl p-4 ${isSufficientFund ? 'hidden' : 'block'}`}
          >
            <Image src={Error} alt="Error" className="h-6 w-6" />
            <p>Insufficient fund. Please top up then try again.</p>
          </div>

          <div className="flex justify-center gap-4">
            <ConnectButton />
          </div>
        </section>
      )}
    </div>
  )
}
