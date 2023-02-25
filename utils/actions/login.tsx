import { setAuthorized, setMana, setProfileImage, setReputation, setUsername } from '../../zustand/stores/useAuthorizationStore'
import api from '../api'
import getUserData, { getUserDataProfile } from './user'

function loginKeychain(username: string|null) {
    if (!username) { return }
    if (!window.hive_keychain) { return }

    const ts = Date.now()

    window.hive_keychain.requestSignBuffer(username, `${username}${ts}`, 'Posting', async (r: any) => {
        if (r.success) {
          processLogin({username, ts, sig: r.result}).then( async () => {
            const { data } = await api.post('user', { username} )

            let userImage = data?.result[0]?.posting_json_metadata

            if(userImage){
              userImage = JSON.parse(userImage)
              userImage = userImage.profile.profile_image
            }

            setProfileImage(userImage)
            setUsername(data.result[0].name)
          }
            
          )
        }
      })
}



async function processLogin ({ username, ts, sig, smartlock = false}: any) {

    try {
      const { data } = await api.post('auth', { username, ts, sig, smartlock} )

      localStorage.setItem('username', data.username)
      localStorage.setItem('smartlock', data.smartlock)
      setAuthorized(data.authorized)
      getUserDataProfile(data.username).then((data:any) => {
        setReputation(data.result.reputation)
      })
      getUserData(data.username).then((data:any) => {
        const max_mana = parseFloat(data.result.rc_accounts[0].max_rc) - parseFloat(data.result.rc_accounts[0].received_delegated_rc)
        let mana = max_mana / parseFloat(data.result.rc_accounts[0].rc_manabar.current_mana)
        mana = parseFloat(mana.toFixed(2))
        setMana(mana)
      })
      
    } catch {
    }
}




export default loginKeychain