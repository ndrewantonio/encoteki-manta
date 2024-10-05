import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'

type MintContextType = {
  isSufficientFund: boolean
  setIsSufficientFund: Dispatch<SetStateAction<boolean>>
  txSuccess: boolean
  setTxSuccess: Dispatch<SetStateAction<boolean>>
  hash: any
  setHash: Dispatch<SetStateAction<any | null>>
}

const MintContext = createContext<MintContextType | undefined>(undefined)

export const MintProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSufficientFund, setIsSufficientFund] = useState(true)
  const [txSuccess, setTxSuccess] = useState(false)
  const [hash, setHash] = useState<any | null>(null)

  return (
    <MintContext.Provider
      value={{
        isSufficientFund,
        setIsSufficientFund,
        txSuccess,
        setTxSuccess,
        hash,
        setHash,
      }}
    >
      {children}
    </MintContext.Provider>
  )
}

export const useMintCtx = () => {
  const context = useContext(MintContext)
  if (!context) {
    throw new Error('useMint must be used within a MintProvider')
  }
  return context
}
