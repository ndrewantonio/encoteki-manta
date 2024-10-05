import { useConnectModal } from '@rainbow-me/rainbowkit'
import React from 'react'

export default function NavbarConnectBtn() {
  const { openConnectModal } = useConnectModal()

  return (
    <>
      {openConnectModal && (
        <button
          onClick={openConnectModal}
          type="button"
          className="w-full rounded-[32px] border border-primary-green bg-white px-6 py-4 hover:bg-green-90"
        >
          <p className="font-medium text-primary-green">Connect Wallet</p>
        </button>
      )}
    </>
  )
}
