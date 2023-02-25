import apiHive from '../apiHive'

interface Posts {
    sort: string,
    tag: string,
    recentUser?: {
        start: string,
        link: string
    }
    nextUser?: {
        start: string,
        link: string
    }
    isRecent?: boolean,
    limit?: number,
}

interface Post {
    author: string
    permlink: string
}

export async function getPosts ({...props}: Posts) {
    try {
        const { data } = await apiHive.post('', { 
            "jsonrpc": "2.0",
            "method": "bridge.get_ranked_posts",
            "params": {
                "sort": props.sort,
                "tag": props.tag,
            },
            "id": 1
     })
     return data
      
    } catch {
    }
}


export async function getPost ({...props}: Post) {
    try {
        const { data } = await apiHive.post('', {
            "id": 21,
            "jsonrpc": "2.0",
            "method": "bridge.get_post",
            "params": {
                "author": props.author,
                "permlink": props.permlink,
            }
        })
     return data
      
    } catch {
    }
}
