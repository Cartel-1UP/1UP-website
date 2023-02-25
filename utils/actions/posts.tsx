import apiHive from '../apiHive'

interface Props {
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

export async function getPosts ({...props}: Props) {
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
