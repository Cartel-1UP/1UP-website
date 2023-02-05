import { setAuthorized, setProfileImage, setUsername } from '../../zustand/stores/useAuthorizationStore'
import api from '../api'

function loginKeychain(username: string|null) {
    if (!username) { return }
    if (!window.hive_keychain) { return }

    const ts = Date.now()

    window.hive_keychain.requestSignBuffer(username, `${username}${ts}`, 'Posting', async (r: any) => {
        if (r.success) {
          processLogin({username, ts, sig: r.result}).then( async () => {
            const { data } = await api.post('user', { username} )

            let userImage = data?.result[0]?.posting_json_metadata

            userImage = JSON.parse(userImage)
            userImage = userImage.profile.profile_image
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
      
    } catch {
    }
}




export default loginKeychain