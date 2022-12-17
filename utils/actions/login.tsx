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
      console.log(data)

      // await Promise.all([
      //   dispatch('fetchFollowers', username),
      //   dispatch('fetchFollowing', username),
      //   dispatch('fetchAccountScotData')
      // ])
    } catch {
    //
    }
}

export default loginKeychain