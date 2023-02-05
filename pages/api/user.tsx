import { NextApiRequest, NextApiResponse } from 'next';
import apiHive from '../../utils/apiHive';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {...body} = req.body
  if (req.method === 'POST') {
    try {
      
    const { data } = await apiHive.post('', { 
        "id": 0,
        "jsonrpc": "2.0",
        "method": "condenser_api.get_accounts",
        "params": [
            [
                body.username
            ]
        ]
     } )
     return res.json(data)
    }
    catch (e : any) {
        res.status(500).json({ error: e.message })
    
        return res.status(401)
        } 
  }
  else {
    return 0
  }
}