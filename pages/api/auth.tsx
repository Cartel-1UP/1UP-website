import { Client, cryptoUtils, Signature } from '@hiveio/dhive';

const client = new Client('https://api.hive.blog');

interface Data {
    username?: string;
    response: string
}

export default async function getFeed({req, res}:any) {

    const { username, sig, ts, smartlock } = req.body


    try {
      const [account] = await client.database.getAccounts([username])
  
      let validSignature = false
  
      const publicKey = Signature.fromString(sig)
        .recover(cryptoUtils.sha256(`${username}${ts}`))
        .toString()
  
      const thresholdPosting = account.posting.weight_threshold
      const authorizedAccountsPosting = new Map(account.posting.account_auths)
  
      // Trying to validate using posting key
      if (!validSignature) {
        for (let i = 0; i < account.posting.key_auths.length; i += 1) {
          const auth = account.posting.key_auths[i]
  
          if (auth[0] === publicKey && auth[1] >= thresholdPosting) {
            validSignature = true
            break
          }
        }
      }
  
      // Trying to validate using posting authority
      if (!validSignature && authorizedAccountsPosting.size > 0) {
        let accountsData:any = await client.database.getAccounts(
          Array.from(authorizedAccountsPosting.keys())
        )
  
        accountsData = accountsData.map((a: { posting: { key_auths: any[]; }; }) => a.posting.key_auths[0])
  
        for (let i = 0; i < accountsData.length; i += 1) {
          const auth = accountsData[i]
  
          if (auth[0] === publicKey && auth[1] >= thresholdPosting) {
            validSignature = true
            break
          }
        }
      }
  
      if (validSignature) {
        req.session.user = username
        req.session.smartlock = smartlock
        console.log(req.session.user)
        return res.json({ username, smartlock })
      }
    } catch (error) {
      res.status(500).json({response: 'error'})
    }
  
    return res.status(401)
}