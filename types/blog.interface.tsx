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
        post_id: number
        promoted: string
        replies: []
        stats: ArticleStats
        title: string
        updated: string
        url: string
    }  
}