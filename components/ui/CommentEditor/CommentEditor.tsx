'use client'

import { generateRandomLetters } from '@/utils/methods/generateRandom'
import { useAuthorizationStore } from '@/zustand/stores/useAuthorizationStore'
import { ActionIcon, Button, Card, Container, Divider, Grid, Group, Space, Text, Textarea } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconBold, IconHeading, IconItalic, IconLink, IconList, IconPhotoDown, IconQuote } from '@tabler/icons'
import { KeychainSDK, Post } from 'keychain-sdk'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Markdown } from '../Markdown/Markdown'
import { NotificationText } from '../ProgressBar/ProgressBar'
import useStyles from './style'

type Tag = {
  name: string
  type: 'link' | 'heading' | 'bold' | 'italic' | 'image' | 'quote' | 'list'
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
  const queryCache = useQueryClient()
  const [markdown, setMarkdown] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

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
        case 'quote':
          modifiedValue += `> ${selectedText}`
          break
        case 'list':
          modifiedValue += `\n - ${selectedText}`
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
      await keychain.post(formParamsAsObject.data as Post)
    },
    {
      onSuccess: () => {
        showNotification({
          autoClose: 10000,
          title: "Success",
          message: <NotificationText message={`Your comment was sent correctly`} time={10000} />,
          styles: (theme) => ({
            root: {
              backgroundColor: '#072f37',
              borderColor: '#072f37',
              '&::before': { backgroundColor: theme.white },
            },
            title: { color: theme.white },
            description: { color: theme.white },
            closeButton: {
              color: theme.white,
              '&:hover': { backgroundColor: '#04191d' },
            },
          }),
          loading: false,
          onClose: () => {
            queryCache.refetchQueries(queryKey)
          },
        })
        const timeout = setTimeout(() => {
          setIsComment(false)
          setMarkdown('')
        }, 4000)
          ; () => clearTimeout(timeout)
      },
      onError: (e: any) => {
        showNotification({
          autoClose: 3000,
          title: "Error",
          message: <NotificationText message={`Something went wrong`} time={3000} />,
          styles: (theme) => ({
            root: {
              backgroundColor: '#072f37',
              borderColor: '#072f37',
              '&::before': { backgroundColor: theme.white },
            },
            title: { color: theme.white },
            description: { color: theme.white },
            closeButton: {
              color: theme.white,
              '&:hover': { backgroundColor: '#04191d' },
            },
          }),
          loading: false,
        })
        const timeout = setTimeout(() => {
          setIsComment(false)
          setMarkdown('')
        }, 2500)
          ; () => clearTimeout(timeout)
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
              <ActionIcon variant="default" onClick={() => handleTagButtonClick('Link', 'link')}>
                <IconLink size="1rem" />
              </ActionIcon>
              <ActionIcon variant="default" onClick={() => handleTagButtonClick('Image', 'image')}>
                <IconPhotoDown size="1rem" />
              </ActionIcon>
              <ActionIcon variant="default" onClick={() => handleTagButtonClick('Quote', 'quote')}>
                <IconQuote size="1rem" />
              </ActionIcon>
              <ActionIcon variant="default" onClick={() => handleTagButtonClick('List', 'list')}>
                <IconList size="1rem" />
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
            {markdown !== '' && (
              <>
                <Text pb={5}>Preview</Text>
                <Card withBorder radius={4} sx={{ borderColor: '#CED4DA' }}>
                  <Markdown text={markdown} />
                </Card>
              </>
            )
            }
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
