import api from '../api'

type Posts = {
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

export  async function getPosts(props: Posts) {
    try {
        const { data } = await api.post(props.sort, { 
            tag: props.tag, 
            sort: props.sort,
            // start: props.isRecent ? props.recentUser?.start : props.nextUser?.start,
            // link: props.isRecent ? props.recentUser?.link : props.nextUser?.link,
            number: props.limit
            } 
        )

        return data
             
    } catch (e:any) {
        console.log(e)
    }
}