import apiHive from '../apiHive'



async function getUserData (username: any) {

    try {
        const { data } = await apiHive.post('', { 
            "jsonrpc": "2.0",
            "method": "rc_api.find_rc_accounts",
            "params": {
                "accounts": [
                    username
                ]
            },
            "id": 1
     })
     return data
      
    } catch {
    }
}




export default getUserData