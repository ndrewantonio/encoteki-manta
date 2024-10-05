import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../assets/encoteki-logo.png'
import NavbarConnectBtn from '../button/navbarConnectBtn'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Navbar() {
  const { isConnected } = useAccount()
  return (
    <header className="z-50 flex items-center justify-between">
      <Link href="/">
        <Image src={Logo} alt="Encoteki Logo" className="w-12 tablet:w-24" />
      </Link>

      <div className="flex gap-6">
        <Link href="/dao">
          <button className="w-[160px] rounded-[32px] border border-primary-green bg-white py-4 hover:bg-green-90">
            <span className="font-medium text-primary-green">DAO</span>
          </button>
        </Link>

        {isConnected ? <ConnectButton /> : <NavbarConnectBtn />}
      </div>
    </header>
  )
}
