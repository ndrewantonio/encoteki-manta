import { useConnectModal } from '@rainbow-me/rainbowkit'
import React from 'react'

export default function MintConnectBtn() {
  const { openConnectModal } = useConnectModal()

  return (
    <>
      {openConnectModal && (
        <button
          onClick={openConnectModal}
          type="button"
          className="w-full rounded-[32px] bg-primary-green py-3 hover:bg-green-900"
        >
          <p className="font-medium text-white">Continue</p>
        </button>
      )}
    </>
  )
}
