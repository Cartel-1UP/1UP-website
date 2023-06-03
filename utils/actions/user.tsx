import { User } from '../../types/user.interface'
import apiHive from '../apiHive'

interface Props {
    author: string
}

export async function getUserData(username: string) {

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


export async function getUserDataProfile(username: string) {

    try {
        const { data } = await apiHive.post('', {
            "jsonrpc": "2.0",
            "method": "bridge.get_profile",
            "params": {
                "account": username
            },
            "id": 1
        })
        return data

    } catch {
    }
}


export async function getUserProfile({ ...props }: Props): Promise<{ data: User }> {
    const { data } = await apiHive.post('', {
        "jsonrpc": "2.0",
        "method": "bridge.get_profile",
        "params": {
            "account": props.author
        },
        "id": 1
    })
    return { data }
}