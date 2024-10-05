import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabaseClient'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const { id: daoId } = req.query

    const { data, error } = await supabase
      .from('option')
      .select('*')
      .eq('dao_id', daoId)
      .neq('option_name', 'Neutral')

    if (error) return res.status(500).json({ error: error.message })

    res.setHeader('Cache-Control', 'no-store')

    return res.status(200).json({ data })
  } else {
    res.status(405).end()
  }
}
