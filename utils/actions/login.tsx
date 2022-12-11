

function loginKeychain(username: string) {
    if (!username) { return }
    if (!window.hive_keychain) { return }

    const ts = Date.now()

    window.hive_keychain.requestSignBuffer(username, `${username}${ts}`, 'Posting', async (r: any) => {
        if (r.success) {
          localStorage.setItem('username', username)
          console.log(r)
        }
      })
}

export default loginKeychain