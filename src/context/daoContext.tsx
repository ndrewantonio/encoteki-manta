import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'

type DaoContextType = {
  nftCollection: Set<number>
  setNftCollection: Dispatch<SetStateAction<Set<number>>>
  voteSuccess: boolean
  setVoteSuccess: Dispatch<SetStateAction<boolean>>
  // hash: any
  // setHash: Dispatch<SetStateAction<any | null>>
}

const DaoContext = createContext<DaoContextType | undefined>(undefined)

export const DaoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [nftCollection, setNftCollection] = useState<Set<number>>(new Set())
  const [voteSuccess, setVoteSuccess] = useState(false)
  // const [hash, setHash] = useState<any | null>(null)

  return (
    <DaoContext.Provider
      value={{ nftCollection, setNftCollection, voteSuccess, setVoteSuccess }}
    >
      {children}
    </DaoContext.Provider>
  )
}

export const useDaoCtx = () => {
  const context = useContext(DaoContext)
  if (!context) {
    throw new Error('useDao must be used within a DaoProvider')
  }
  return context
}
