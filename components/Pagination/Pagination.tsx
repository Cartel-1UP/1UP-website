'use client'

import { ActionIcon, Group } from '@mantine/core';
import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons';
import { useEffect } from 'react';
import api from '../../utils/api';
import { setLastUser, setPosts, usePostsStore } from '../../zustand/stores/usePostsStore';

function BlogPagination() {
  const posts = usePostsStore((state: { posts: any; }) => state.posts)
  const lastUser = usePostsStore((state: { lastUser: any; }) => state.lastUser)

  
  type Posts = {
    tag: string,
    nextBlog?: {
      start: string,
      link: string
    }
  }

  async function getPosts(props: Posts) {
    try {
      const { data } = await api.post('trending', { 
        tag: props.tag, 
        start: lastUser?.author, 
        link: lastUser?.link
      } 
      )   
      const user = {
        author: data?.result[3].author,
        link: data?.result[3].permlink
      }   
      console.log(data)
      
      setLastUser(user)   
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
        <ActionIcon>
          <IconArrowNarrowLeft size={48} />
        </ActionIcon>
        <ActionIcon onClick={() => getPosts({tag: "hive-102223"})}>
          <IconArrowNarrowRight size={48} />
        </ActionIcon>
      </Group>
    </>
)
}

export default BlogPagination
