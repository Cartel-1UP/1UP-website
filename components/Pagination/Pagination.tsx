'use client'

import { ActionIcon, Group } from '@mantine/core';
import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons';
import { useEffect } from 'react';
import api from '../../utils/api';
import { setNextUser, setPosts, setRecentUser, usePostsStore } from '../../zustand/stores/usePostsStore';

function BlogPagination() {
  const nextUser = usePostsStore((state: { nextUser: any; }) => state.nextUser)
  const recentUser = usePostsStore((state: { recentUser: any; }) => state.recentUser)
  
  type Posts = {
    tag: string,
    nextBlog?: {
      start: string,
      link: string
    }
    isRecent?: boolean
  }

  async function getPosts(props: Posts) {
    try {
      const { data } = await api.post('trending', { 
        tag: props.tag, 
        start: props.isRecent ? recentUser.author : nextUser.author,
        link: props.isRecent ? recentUser.link : nextUser.link,
      } 
      )   

      const user2 = {
          author: data?.result[0].author,
          link: data?.result[0].permlink
        }   
      const user = {
          author: data?.result[3].author,
          link: data?.result[3].permlink
        }   

      props.isRecent && setRecentUser(user2) 
      setNextUser(user) 
      setPosts(data.result)      
    } catch (e:any) {
      console.log(e)
    }
  }

    useEffect(() => {
      getPosts({tag: "hive-102223"})
    }, [])
  
  return (
    <>
      <Group position="center" spacing="xl">
        <ActionIcon onClick={() => getPosts({tag: "hive-102223", isRecent: true})}>
          <IconArrowNarrowLeft size={48} />
        </ActionIcon>
        <ActionIcon onClick={() => getPosts({tag: "hive-102223", isRecent: false})}>
          <IconArrowNarrowRight size={48} />
        </ActionIcon>
      </Group>
    </>
)
}

export default BlogPagination
