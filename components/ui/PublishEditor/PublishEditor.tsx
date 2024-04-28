'use client'

import { useAuthorizationStore } from '@/zustand/stores/useAuthorizationStore'
import {
  ActionIcon,
  Button,
  Card,
  Grid,
  Group,
  Space,
  TextInput,
  Textarea
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import {
  IconBold,
  IconHeading,
  IconItalic,
  IconLink,
  IconList,
  IconPhotoDown,
  IconQuote,
  IconTable,
} from '@tabler/icons'
import { KeychainSDK, Post } from 'keychain-sdk'
import React, { useRef, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Markdown } from '../Markdown/Markdown'
import { NotificationText } from '../ProgressBar/ProgressBar'
import useStyles from './style'

type Tag = {
  name: string
  type: 'link' | 'heading' | 'bold' | 'italic' | 'image' | 'quote' | 'list' | 'table'
}

const PublishEditor = () => {
  const { classes, theme } = useStyles()
  const queryCache = useQueryClient()
  const [markdown, setMarkdown] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')

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
        case 'table':
          modifiedValue += `|column1|column2|column3|\n|-|-|-|\n|content1|content2|content3|`
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

  const handlePostComment = useMutation<void, any, void, unknown>(
    async () => {
      const keychain = new KeychainSDK(window)
      const formParamsAsObject = {
        data: {
          username: username,
          body: markdown,
          parent_perm: 'test',
          parent_username: 'test',
          json_metadata:
            '{"format":"markdown","description":"Message from Cartel website","tags":["Message"]}',
          permlink: 'test',
          comment_options: `{\"author\":\"${username}\",\"permlink\":\"test\",\"max_accepted_payout\":\"10000.000 HBD\",\"allow_votes\":true,\"allow_curation_rewards\":true,\"extensions\":[],\"percent_hbd\":63}`,
        },
      }
      await keychain.post(formParamsAsObject.data as Post)
    },
    {
      onSuccess: () => {
        showNotification({
          autoClose: 7000,
          title: 'Success',
          message: <NotificationText message={`Your comment was sent correctly`} time={7000} />,
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
            // queryCache.refetchQueries(queryKey)
          },
        })
        const timeout = setTimeout(() => {
          setMarkdown('')
        }, 4000)
          ; () => clearTimeout(timeout)
      },
      onError: (e: any) => {
        showNotification({
          autoClose: 3000,
          title: 'Error',
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
          setMarkdown('')
        }, 2500)
          ; () => clearTimeout(timeout)
      },
    }
  )

  return (
    <>
      <Space h="xl" />

      <Grid mih={'80vh'}>
        <Grid.Col span={6}>
          <TextInput placeholder="Title" value={title} onChange={(event) => setTitle(event.currentTarget.value)} />
        </Grid.Col>
        <Grid.Col span={12}>
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
            <ActionIcon variant="default" onClick={() => handleTagButtonClick('Table', 'table')}>
              <IconTable size="1rem" />
            </ActionIcon>
          </Group>
        </Grid.Col>
        <Grid.Col span={6}>
          <Textarea
            value={markdown}
            onChange={handleMarkdownChange}
            ref={textareaRef}
            autosize
            minRows={20}
            placeholder='Write your post here...'
          />
          <TextInput mt={10} placeholder="Summary" value={summary} onChange={(event) => setSummary(event.currentTarget.value)} />
          <TextInput mt={10} placeholder="Tags" value={summary} miw={'80%'} />
          <Button mt={10} variant="outline" color={'dark'} onClick={() => console.log('addTag')}>
            Add tag
          </Button>
        </Grid.Col>
        <Grid.Col span={6}>
          <>
            <Card withBorder radius={4} sx={{ borderColor: '#CED4DA' }}>
              <Markdown text={markdown} />
            </Card>
          </>

        </Grid.Col>
        <Grid.Col>
          <Group className={classes.buttonContainer}>
            <Button variant="outline" color={'dark'} onClick={() => handlePostComment.mutate()}>
              Publish
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </>
  )
}

export default PublishEditor
