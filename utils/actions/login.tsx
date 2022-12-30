import { setAuthorized } from '../../zustand/stores/useAuthorizationStore'
import api from '../api'

function loginKeychain(username: string) {
    if (!username) { return }
    if (!window.hive_keychain) { return }

    const ts = Date.now()

    window.hive_keychain.requestSignBuffer(username, `${username}${ts}`, 'Posting', async (r: any) => {
        if (r.success) {
          processLogin({username, ts, sig: r.result})
        }
      })
}



async function processLogin ({ username, ts, sig, smartlock = false}: any) {

    try {
      const { data } = await api.post('auth', { username, ts, sig, smartlock } )

      localStorage.setItem('username', data.username)
      localStorage.setItem('smartlock', data.smartlock)
      setAuthorized(data.authorized)
      console.log(data)
    } catch {
    }
}

export default loginKeychain