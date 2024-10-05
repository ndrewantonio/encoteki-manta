import { useMintCtx } from '../../context/mintContext'

export default function FinishTransactionBtn() {
  const { setTxSuccess, hash } = useMintCtx()

  const handleClick = () => {
    setTxSuccess(false)
  }

  const testnetURL = process.env.NEXT_PUBLIC_TESTNET_URL
  return (
    <div className="flex flex-col gap-2">
      {testnetURL && hash ? (
        <a
          href={`${testnetURL}${hash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="w-full rounded-[32px] bg-primary-green py-3 hover:bg-green-900">
            <p className="font-medium text-white">Check NFT</p>
          </button>
        </a>
      ) : (
        <button
          disabled
          className="w-full cursor-not-allowed rounded-[32px] bg-gray-500 py-3"
        >
          <p className="font-medium text-white">Check NFT (Unavailable)</p>
        </button>
      )}
      <button
        onClick={handleClick}
        type="button"
        className="w-full rounded-[32px] bg-primary-green py-3 hover:bg-green-900"
      >
        <p className="font-medium text-white">Return to Home</p>
      </button>
    </div>
  )
}
