'use client'

import { generateRandomLetters } from '@/utils/methods/generateRandom'
import { useAuthorizationStore } from '@/zustand/stores/useAuthorizationStore'
import { useNotifiactionStore } from '@/zustand/stores/useNotificationStore'
import { ActionIcon, Button, Container, Divider, Grid, Group, Space, Textarea } from '@mantine/core'
import { IconBold, IconHeading, IconItalic, IconLink, IconPhotoDown } from '@tabler/icons'
import { KeychainSDK, Post } from 'keychain-sdk'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { useMutation } from 'react-query'
import useStyles from './style'

type Tag = {
  name: string
  type: 'link' | 'heading' | 'bold' | 'italic' | 'image'
}

type Props = {
  setIsComment: Dispatch<SetStateAction<boolean>> | any
  permlink: string
  parentAuthor: string
  parentPermlink: string
  queryKey?: string
}

const CommentEditor = ({ setIsComment, permlink, parentAuthor, queryKey }: Props) => {
  const { classes, theme } = useStyles()
  const [markdown, setMarkdown] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const addSnackbar = useNotifiactionStore((state) => state.addSnackbar)
  const username = useAuthorizationStore((state: { username: string }) => state.username)

  const handleMarkdownChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(event.target.value)
  }

  const handleTagButtonClick = (tagName: string, type: Tag['type']) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current
      const start = textarea.selectionStart || 0
      const end = textarea.selectionEnd || 0
      const value = textarea.value

      let modifiedValue = value.slice(0, start)
      const selectedText = value.slice(start, end)

      switch (type) {
        case 'link':
          modifiedValue += `[${selectedText}]()`
          break
        case 'heading':
          modifiedValue += `# ${selectedText}`
          break
        case 'bold':
          modifiedValue += `**${selectedText}**`
          break
        case 'italic':
          modifiedValue += `*${selectedText}*`
          break
        case 'image':
          modifiedValue += `![${selectedText}]()`
          break
        default:
          modifiedValue += selectedText
          break
      }

      modifiedValue += value.slice(end)
      setMarkdown(modifiedValue)
      textarea.focus()
      textarea.setSelectionRange(start, start + selectedText.length)
    }
  }

  const randomChars = generateRandomLetters(6)
  const commentPermlink = `re-${permlink}-${randomChars}`
  const handlePostComment = useMutation<void, any, void, unknown>(
    async () => {
      const keychain = new KeychainSDK(window)
      const formParamsAsObject = {
        data: {
          username: username,
          body: markdown,
          parent_perm: permlink,
          parent_username: parentAuthor,
          json_metadata:
            '{"format":"markdown","description":"Message from Cartel website","tags":["Message"]}',
          permlink: commentPermlink,
          comment_options: `{\"author\":\"${username}\",\"permlink\":\"${commentPermlink}\",\"max_accepted_payout\":\"10000.000 HBD\",\"allow_votes\":true,\"allow_curation_rewards\":true,\"extensions\":[],\"percent_hbd\":63}`,
        },
      }
      await keychain.post(formParamsAsObject.data as Post).then((response) => {
        console.log(response)
      })
    },
    {
      onSuccess: () => {
        addSnackbar({
          id: '2',
          title: 'Success',
          message: 'Your comment was sent correctly',
          queryKey: queryKey,
        })
        const timeout = setTimeout(() => {
          setIsComment(false)
          setMarkdown('')
        }, 4000)
          ; () => clearTimeout(timeout)
      },
      onError: (e: any) => {
        console.log(e)
      },
    }
  )

  return (
    <>
      <Divider my="lg" />
      <Space h="xl" />
      <Container size={'sm'}>
        <Grid grow>
          <Grid.Col>
            <Group spacing={3}>
              <ActionIcon variant="default" onClick={() => handleTagButtonClick('Link', 'link')}>
                <IconLink size="1rem" />
              </ActionIcon>
              <ActionIcon
                variant="default"
                onClick={() => handleTagButtonClick('Heading', 'heading')}
              >
                <IconHeading size="1rem" />
              </ActionIcon>
              <ActionIcon variant="default" onClick={() => handleTagButtonClick('Bold', 'bold')}>
                <IconBold size="1rem" />
              </ActionIcon>
              <ActionIcon
                variant="default"
                onClick={() => handleTagButtonClick('Italic', 'italic')}
              >
                <IconItalic size="1rem" />
              </ActionIcon>
              <ActionIcon variant="default" onClick={() => handleTagButtonClick('Image', 'image')}>
                <IconPhotoDown size="1rem" />
              </ActionIcon>
            </Group>
          </Grid.Col>
          <Grid.Col>
            <Space w="sm" />
            <Textarea
              value={markdown}
              onChange={handleMarkdownChange}
              ref={textareaRef}
              autosize
              minRows={4}
            />
            <Space w="sm" />
          </Grid.Col>
          <Grid.Col>
            <Group className={classes.buttonContainer}>
              <Button variant="outline" color={'dark'} onClick={() => handlePostComment.mutate()}>
                Submit
              </Button>
              <Button variant="outline" color={'dark'} onClick={() => setIsComment(false)}>
                Cancel
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  )
}

export default CommentEditor
