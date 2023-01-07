import { NextApiRequest, NextApiResponse } from 'next';
import apiHive from '../../utils/apiHive';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const tag = req.body
  console.log(tag)
  if (req.method === 'POST') {
    try {
    const { data } = await apiHive.post('', { 
        "id": 1,
        "jsonrpc": "2.0",
        "method": "bridge.get_ranked_posts",
        "params": {
            "sort": "hot",
            "tag": tag,
            "observer": "hive.blog",
            "limit": 4
        }
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