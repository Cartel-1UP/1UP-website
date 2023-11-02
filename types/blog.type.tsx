export type Maincard = {
  id: number
  author: string
  category: string
  title: string
  image: string
  created_at: Date
  permlink: string
}

export type Posts = {
  sort: string
  tag?: string
  isRecent?: boolean
  limit?: number
  observer?: string
  account?: string
  start_author?: string
  start_permlink?: string
}

export type Post = {
  author: string
  permlink: string
}

export type Tag = {
  name: string
  type: 'link' | 'heading' | 'bold' | 'italic' | 'image'
}

export type Vote = {
  rshares: number
  voter: string
}

export type ArticleMetaData = {
  app: string
  description: string
  format: string
  image: string[]
  image_ratios: number[]
  tags: string[]
}

export type HiveArticle = {
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
  reblogged_by: string
}

export type ArticleStats = {
  flag_weight: number
  gray: boolean
  hide: boolean
  total_votes: number
  is_pinned?: boolean
}

export type UsersChoiceCard = {
  id: number
  userpost: HiveArticle
}

export type HiveArticleComments = {
  id: number
  result: HiveArticle[]
}

export type Bookmark = {
  author: string
  permlink: string
}
