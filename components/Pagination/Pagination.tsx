'use client'

import { ActionIcon, Group } from '@mantine/core';
import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons';
import { useEffect } from 'react';
import getPosts from '../../utils/actions/posts';
import { setLatestPosts, setPosts, usePostsStore } from '../../zustand/stores/usePostsStore';


type Props = {
  amount: number
  type: string
  tag: string
}

function BlogPagination({amount, type, tag}: Props) {
  const nextUser = usePostsStore((state: { nextUser: any; }) => state.nextUser)
  const recentUser = usePostsStore((state: { recentUser: any; }) => state.recentUser)
  
  // type Posts = {
  //   tag: string,
  //   nextBlog?: {
  //     start: string,
  //     link: string
  //   }
  //   isRecent?: boolean,
  // }

  // async function getPosts(props: Posts) {
  //   try {
  //     const { data } = await api.post('trending', { 
  //       tag: props.tag, 
  //       start: props.isRecent ? recentUser.author : nextUser.author,
  //       link: props.isRecent ? recentUser.link : nextUser.link,
  //       number: amount
  //     } 
  //     )   

  //     console.log(amount)

  //     const user2 = {
  //         author: data?.result[0].author,
  //         link: data?.result[0].permlink
  //       }   
  //     const user = {
  //         author: data?.result[3].author,
  //         link: data?.result[3].permlink
  //       }   

  //     props.isRecent && setRecentUser(user2) 
  //     setNextUser(user) 
  //     setPosts(data.result)      
  //   } catch (e:any) {
  //     console.log(e)
  //   }
  // }




    useEffect(() => {
      console.log(type)
      getPosts({
        tag: tag,
        sort: type,
        limit: amount
      }).then((data) => {  
        switch (type) {
          case 'trending':
            setPosts(data.result) 
            break;
          case 'latest':
            setLatestPosts(data.result) 
            break
           default:
            null
            break
        }
      }
      )
    }, [])
  
  return (
    <>
      <Group position="center" spacing="xl">
        <ActionIcon onClick={() => getPosts({
          tag: tag, 
          isRecent: true,
          sort: type
        })}>
          <IconArrowNarrowLeft size={48} />
        </ActionIcon>
        <ActionIcon onClick={() => getPosts({
          tag: tag, 
          isRecent: false,
          sort: type
        })}>
          <IconArrowNarrowRight size={48} />
        </ActionIcon>
      </Group>
    </>
)
}

export default BlogPagination
