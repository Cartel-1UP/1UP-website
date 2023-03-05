import { remark } from 'remark';
import html from 'remark-html';
import apiHive from '../apiHive';

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
                "limit": props.limit
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

        const processedContent = await remark()
        .use(html)
        .process(data.result.body);
        
        const contentHtml = processedContent.toString();

        const time = readTime(contentHtml)

     return { data, contentHtml, time}

      
    } catch {
    }
}


function readTime(content: string) {
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