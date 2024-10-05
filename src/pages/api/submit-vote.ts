import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabaseClient'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { nft_id, dao_id, option_id, isNeutral } = req.body

    try {
      const { data, error } = await supabase
        .from('vote_mapping')
        .insert([{ nft_id, dao_id, option_id, isNeutral }])

      if (error) {
        return res.status(400).json({ error: error.message })
      }

      return res
        .status(201)
        .json({ status: res.statusCode, message: 'Voted Successfully' })
    } catch (err) {
      console.error('Error inserting vote:', err)
      return res
        .status(500)
        .json({ error: 'An error occurred while creating a vote' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
