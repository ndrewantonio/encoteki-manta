import FinishTransactionBtn from '../button/finishBtn'
import Image from 'next/image'
import Checkmark from '../../assets/success.png'

export default function TxConfirmation() {
  return (
    <div className="relative h-auto w-[400px] rounded-3xl bg-white drop-shadow-xl">
      <header className="p-6">
        <h1 className="text-lg font-medium">Thank you!</h1>
      </header>
      <main className="flex flex-col gap-8 p-6">
        <div className="m-auto">
          <Image src={Checkmark} alt="Success" width={260} height={260} />
        </div>
        <section className="space-y-2 px-8 text-center">
          <p className="text-lg">Payment Successful!</p>
          <p className="text-neutral-30 text-sm">
            Thank you for your payment, Encoteki is now yours!
          </p>
        </section>

        <FinishTransactionBtn />
      </main>
    </div>
  )
}
