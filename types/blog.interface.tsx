export interface Vote {
    rshares: number
    voter: string
}

export interface ArticleStats {
    flag_weight: number
    gray: boolean
    hide: boolean
    total_votes: number
}

export interface ArticleMetaData {
    app: string
    description: string
    format: string
    image: string[]
    image_ratios: number[]
    tags: string[]
}

export interface Article {
    id: number
    result: {
        active_votes: Vote[]
        author: string
        author_payout_value: string
        author_reputation: number
        author_role: string
        author_title: string
        beneficiaries: []
        blacklists: []
        body: string
        category: string
        children: number
        community: string
        community_title: string
        created: string
        curator_payout_value: string
        depth: number
        is_paidout: boolean
        json_metadata: ArticleMetaData
        max_accepted_payout: string
        net_rshares: number
        payout: number
        payout_at: string
        pending_payout_value: string
        percent_hbd: number
        permlink: string
        parent_permlink: string
        post_id: number
        promoted: string
        replies: []
        stats: ArticleStats
        title: string
        updated: string
        url: string
    }
}

export interface PostComment {
    permlink: string
    parentAuthor?: string
    parentPermlink?: string
    body: any
}

export interface Comment {
    subcomments: Comment[]
    id: string,
    postId: string,
    author: string,
    title: string,
    body: string,
    depth: number,
    parent_permlink: string,
    permlink: string,
    replies: any,
    children: any
    author_reputation: any,
    created: string,
    active_votes: any
}

export interface Community {
    result: {
        about: string,
        avatar_url: string,
        created_at: string,
        description: string,
        flag_text: string,
        id: number,
        is_nsfw: boolean,
        lang: string,
        name: string,
        num_authors: number,
        num_pending: number,
        subscribers: number,
        sum_pending: number,
        team: [],
        title: string,
    }
}