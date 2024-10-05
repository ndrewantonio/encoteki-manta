import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabaseClient'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { id: daoId } = req.query
    const { nfts } = req.body
    let remainVote: number = 0

    const { data, error } = await supabase
      .from('vote_mapping')
      .select('nft_id')
      .eq('dao_id', daoId)
      .in('nft_id', nfts.length > 0 ? nfts : [])

    if (data) {
      console.dir(data)
      remainVote = nfts.length - data.length
    }

    if (error) return res.status(500).json({ error: error.message })

    res.setHeader('Cache-Control', 'no-store')

    return res.status(200).json({ voteCount: remainVote, data: data })
  } else {
    res.status(405).end()
  }
}
