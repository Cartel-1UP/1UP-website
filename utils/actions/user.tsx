import { Community } from '@/types/blog.interface'
import { User } from '@/types/user.type'
import { Custom, KeychainKeyTypes, KeychainSDK } from 'keychain-sdk'
import apiHive from '../apiHive'

interface Props {
  author: string
}

export async function getUserData(username: string) {
  try {
    const { data } = await apiHive.post('', {
      jsonrpc: '2.0',
      method: 'rc_api.find_rc_accounts',
      params: {
        accounts: [username],
      },
      id: 1,
    })
    return data
  } catch { }
}

export async function getUserDataProfile(username: string) {
  try {
    const { data } = await apiHive.post('', {
      jsonrpc: '2.0',
      method: 'bridge.get_profile',
      params: {
        account: username,
      },
      id: 1,
    })
    return data
  } catch { }
}

export async function getUserProfile({ ...props }: Props): Promise<{ data: User }> {
  const { data } = await apiHive.post('', {
    jsonrpc: '2.0',
    method: 'bridge.get_profile',
    params: {
      account: props.author,
    },
    id: 1,
  })
  return { data }
}

export async function getCommunityData(community: string): Promise<{ data: Community }> {
  const { data } = await apiHive.post('', {
    jsonrpc: '2.0',
    method: 'bridge.get_community',
    params: {
      name: community,
    },
    id: 1,
  })
  return { data }
}

export async function fetchFollowingAccounts(account: string): Promise<string[]> {
  const batchSize = 100 // Number of accounts to fetch per batch
  let following: string[] = [] // Array to store following accounts

  let start = '' // Pagination parameter

  while (true) {
    try {
      const response = await apiHive.post('https://api.hive.blog', {
        jsonrpc: '2.0',
        method: 'condenser_api.get_following',
        params: {
          account,
          start,
          type: 'blog',
          limit: batchSize,
        },
        id: 1,
      })

      const result = response.data.result
      const fetchedAccounts = result.map((entry: any) => entry.following)

      if (fetchedAccounts.length === 0) {
        // No more accounts to fetch
        break
      }

      following = following.concat(fetchedAccounts)
      if (following.length >= 1000) {
        // Reached the desired limit (1000 in this example)
        break
      }

      start = fetchedAccounts[fetchedAccounts.length - 1] // Set the start parameter for the next request
    } catch (error) {
      console.error('Error fetching following accounts:', error)
      break
    }
  }

  return following
}

export async function postFollowAccount(follower: string, following: string) {
  try {
    const keychain = new KeychainSDK(window)
    const formParamsAsObject = {
      data: {
        username: 'kwskicky',
        id: 'follow',
        method: KeychainKeyTypes.posting,
        json: `[    \"follow\",    {       \"follower\": \"${follower}\",       \"following\": \"${following}\",       \"what\": [          \"blog\"       ]    } ]`,
        display_msg: 'Follow',
      },
    }

    const custom = await keychain.custom(formParamsAsObject.data as Custom)
    return custom
  } catch (error) {
    console.log({ error })
    return error
  }
}
