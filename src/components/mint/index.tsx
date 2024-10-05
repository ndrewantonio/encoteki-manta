import { MintProvider } from '../../context/mintContext'
import MintNFT from './mintNFT'

export default function Mint() {
  return (
    <MintProvider>
      <MintNFT />
    </MintProvider>
  )
}
