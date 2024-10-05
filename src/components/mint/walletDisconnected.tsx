import Image from 'next/image'
import RainbowKit from '../../assets/rainbow_kit.png'

export default function WalletDisconnected() {
  return (
    <div className="pb-8">
      <header className="pb-6">
        <h1 className="text-lg font-medium">Select payment method</h1>
      </header>

      <div className="border-t-2 border-neutral-70"></div>

      <section className="w-full pt-6">
        <div className="flex items-center gap-4 px-4 py-4">
          <Image src={RainbowKit} alt="Encoteki Logo" width={32} height={32} />
          <p className="font-medium">RainbowKit</p>
        </div>
      </section>
    </div>
  )
}
