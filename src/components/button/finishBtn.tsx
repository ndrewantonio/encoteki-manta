import { useMintCtx } from '../../context/mintContext'

export default function FinishTransactionBtn() {
  const { setTxSuccess, hash } = useMintCtx()

  const handleClick = () => {
    setTxSuccess(false)
  }

  const testnetURL = process.env.NEXT_PUBLIC_TESTNET_URL
  return (
    <div className="flex flex-col gap-2">
      <a
        href={`${testnetURL}${hash}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="w-full rounded-[32px] bg-primary-green py-3 hover:bg-green-900">
          <p className="font-medium text-white">View Transaction Detail</p>
        </button>
      </a>

      <button
        onClick={handleClick}
        type="button"
        className="w-full rounded-[32px] bg-white py-3"
      >
        <p className="font-medium text-primary-green">Return to Home</p>
      </button>
    </div>
  )
}
