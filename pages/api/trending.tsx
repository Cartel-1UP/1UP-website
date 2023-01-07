import { NextApiRequest, NextApiResponse } from 'next';
import apiHive from '../../utils/apiHive';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {...body} = req.body
  console.log(body)
  if (req.method === 'POST') {
    try {
      
    const { data } = await apiHive.post('', { 
        "id": 1,
        "jsonrpc": "2.0",
        "method": "bridge.get_ranked_posts",
        "params": {
            "sort": "trending",
            "tag": '',
            "observer": "hive.blog",
            "limit": 4,
            "start_author": body.start ? body.start : '',
            "start_permlink": body.link ? body.link : ''
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