declare global {
    interface Window {
      hive_keychain: any;
    }
  }
  
export const isKeychain = () => {
    return !!window.hive_keychain
  }
