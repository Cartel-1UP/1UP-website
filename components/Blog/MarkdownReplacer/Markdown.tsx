import { Image, Table } from '@mantine/core';
import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Tweet } from 'react-twitter-widgets';
import rehypeRaw from 'rehype-raw';
import gfm from 'remark-gfm';

import useStyles from './style';

interface Props {
  text: string;
}

export function Markdown({ text }: Props) {
  const { classes } = useStyles();
  const imageRegex = /!\[(.*?)\]\((?!.*\*.*)(.*?)\)/gi;
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;

  const markdownBody = useMemo(() => {
    const replacedBody = text.replace(imageRegex, (match, alt, url) => {
      if (url.match(/\.(png|jpe?g|gif|bmp|svg|webp)$/i)) {
        return `<div class="${classes.image}"><Image alt="${alt}" src="${url}" className="${classes.responsiveImage}" /></div>`;
      } else {
        return match;
      }
    });

    return (
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[gfm]}
        components={{
          // Render the anchor element for the "a" Markdown element
          a: ({ href, children }: any) => {
            if (href.match(/\.(jpg|jpeg|png|gif|bmp|svg)$/i)) {
              const width = 'auto';
              const height = 'auto';

              return (
                <div className={classes.image}>
                  <Image src={href} alt="Image" className={classes.responsiveImage} style={{ width, height }} />
                </div>
              );
            } else if (href.match(/^https:\/\/twitter\.com\/[^/]+\/status\/\d+$/)) {
              const tweetId = href.match(/\/status\/(\d+)$/)[1];
              return <Tweet tweetId={tweetId} options={{ width: 350 }} />;
            } else if (href.match(youtubeRegex)) {
              const videoId = href.match(/(?:\?v=|\/embed\/|\.be\/)([^&\n?#]+)/)?.[1];
              if (videoId) {
                return (
                  <div className={classes.video}>
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="YouTube Video"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                );
              }
            }
            return <a href={href} className={classes.link}>{children}</a>;
          },

          table: ({ children }: any) => (
            <Table striped withBorder withColumnBorders>{children}</Table>
          ),
          th: ({ children }: any) => (
            <th className={classes.tableHeader}>{children}</th>
          ),
          td: ({ children }: any) => (
            <td className={classes.tableCell}>{children}</td>
          ),
        }}
      >
        {replacedBody}
      </ReactMarkdown>
    );
  }, [text]);

  return <>{markdownBody}</>;
}
