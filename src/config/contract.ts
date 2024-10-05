import { abi } from './contract-abi'

const smartContractAddress = '0xD2b0395b86EbCD52f21333526327771364c05f0E'

const contractConfig = {
  abi,
  address: smartContractAddress,
} as const

export default contractConfig
