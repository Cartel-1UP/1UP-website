export interface UserMetaData {
    profile: {
        about: string
        blacklist_description: []
        cover_image: string
        location: number
        muted_list_description: string
        name: string
        profile_image: string
        website: string
    }
}

export interface UserStats {

    followers: number
    following: number
    rank: number
}

export interface User {
    id: number
    result: {
        active: string
        blacklist: []
        created: string
        id: number
        metadata: UserMetaData
        name: string
        post_count: number
        reputation: number
        stats: UserStats
    }
}
