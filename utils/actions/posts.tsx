import { Posts } from '@/types/blog.type'
import { Article } from '../../types/blog.interface'
import apiHive from '../apiHive'

interface Post {
  author: string
  permlink: string
}

export async function getMultiPosts({ ...props }: Posts) {
  try {
    const { data } = await apiHive.post('', {
      jsonrpc: '2.0',
      method: 'bridge.get_ranked_posts',
      params: {
        limit: props.limit,
        observer: props.observer,
        sort: props.sort,
        start_author: props.start_author,
        start_permlink: props.start_permlink,
        tag: props.tag,
      },
      id: 1,
    })
    return data
  } catch {}
}

export async function getMultiFeedPosts({ ...props }: Posts) {
  try {
    const { data } = await apiHive.post('', {
      jsonrpc: '2.0',
      method: 'bridge.get_account_posts',
      params: {
        limit: props.limit,
        account: props.account,
        sort: props.sort,
        start_author: props.start_author,
        start_permlink: props.start_permlink,
      },
      id: 1,
    })
    return data
  } catch {}
}

export async function getPosts({ ...props }: Posts) {
  try {
    const { data } = await apiHive.post('', {
      jsonrpc: '2.0',
      method: 'bridge.get_ranked_posts',
      params: {
        sort: props.sort,
        tag: props.tag,
        limit: props.limit,
      },
      id: 1,
    })
    return data
  } catch {}
}

export async function postComment({ ...props }: Posts) {
  try {
    const { data } = await apiHive.post('', {
      jsonrpc: '2.0',
      method: 'bridge.get_ranked_posts',
      params: {
        sort: props.sort,
        tag: props.tag,
        limit: props.limit,
      },
      id: 1,
    })
    return data
  } catch {}
}

export async function getPost({ ...props }: Post): Promise<{ data: Article; time: number }> {
  const { data } = await apiHive.post('', {
    id: 21,
    jsonrpc: '2.0',
    method: 'bridge.get_post',
    params: {
      author: props.author,
      permlink: props.permlink,
    },
  })
  const time = readTime(data.result.body)
  return { data, time }
}

export async function getComments({ ...props }: Post): Promise<{ data: [] }> {
  const { data } = await apiHive.post('', {
    id: 21,
    jsonrpc: '2.0',
    method: 'bridge.get_discussion',
    params: {
      author: props.author,
      permlink: props.permlink,
    },
  })
  return { data }
}

export function readTime(content: string) {
  const WPS = 275 / 60

  var images = 0
  const regex = /\w/

  let words = content.split(' ').filter((word) => {
    if (word.includes('<img')) {
      images += 1
    }
    return regex.test(word)
  }).length

  var imageAdjust = images * 4
  var imageSecs = 0
  var imageFactor = 12

  while (images) {
    imageSecs += imageFactor
    if (imageFactor > 3) {
      imageFactor -= 1
    }
    images -= 1
  }

  const minutes = Math.ceil(((words - imageAdjust) / WPS + imageSecs) / 60)

  return minutes
}

// export const handleCommentSubmit = async ({ permlink, parentAuthor, body }: PostComment) => {
//     try {
//         const commentOptions = {
//             author: 'kwskicky',
//             permlink: permlink,  // Permlink of the post you want to comment on
//             parentAuthor: parentAuthor,  // Leave empty for new posts, specify the author if it's a reply to an existing comment
//             parentPermlink: permlink,  // Permlink of the post you want to comment on
//             title: '',
//             body: body,
//             jsonMetadata: {}
//         };
//         await window.hive_keychain.requestPost(commentOptions);

//     } catch (error) {
//         console.error('Error submitting comment:', error);
//     }
// };
