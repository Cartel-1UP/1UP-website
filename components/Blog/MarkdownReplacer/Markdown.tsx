'use client'
import { Image } from '@mantine/core';
import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Tweet } from 'react-twitter-widgets';
import rehypeRaw from "rehype-raw";
import gfm from 'remark-gfm';
import useStyles from './style';

interface CardProps {
  text: string;
}

export function Markdown({ text }: CardProps) {
    const { classes, theme } = useStyles();
    const imageRegex = /\b(https?:\/\/\S+\.(?:jpg|jpeg|png|gif))\b/gi;

    const markdownBody = useMemo(() => {
    const lines = text.split(/\r?\n/);
    const replacedLines = lines.map((line: any) => {
        if (!/\!\[.*?\]\(.*?\)/gi.test(line)) {
        return line.replace(imageRegex, (url: string) => `![image.png](${url})`);
        }
        return line;
    });
    const replacedBody = replacedLines.join('\n');

    return (
        <ReactMarkdown 
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[gfm]}
            components={{
                img: ({ node }) => {
                const image: any = node.properties;
                
                return (
                    <div className={classes.image}>
                    <Image
                        src={image.src}
                        alt={image.alt}
                        sx={{maxWidth: '500px'}}
                        // width="600"
                        // height="300"
                    />
                    </div>
                );
                },
                a: ({ href, children }: any) => {
                    if (href.match(/^https:\/\/twitter\.com\/[^/]+\/status\/\d+$/)) {
                      const tweetId = href.match(/\/status\/(\d+)$/)[1];
                      return <Tweet tweetId={tweetId} options={{ width: 350}}/>
                    }
                    return <a href={href}>{children}</a>;
                  },
            }}>
        {replacedBody}
        </ReactMarkdown>
    );
    }, [text]);

  

  return (
    <>
        {markdownBody}    
    </>
  );
}
