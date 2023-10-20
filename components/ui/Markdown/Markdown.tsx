import { Image, Table } from '@mantine/core'
import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import { Tweet } from 'react-twitter-widgets'
import rehypeRaw from 'rehype-raw'
import gfm from 'remark-gfm'

import useStyles from './style'

type Props = {
  text: string
}

function isImageUrl(url: string): boolean {
  const imageExtensions = ['jpeg', 'jpg', 'gif', 'bmp', 'svg', 'webp'];
  return imageExtensions.some(ext => url.endsWith(`.${ext}`));
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

function matchesCustomImageRegex(url: string): boolean {
  const customImageRegexes = [
    /!\[(.*?)\]\((?!.*\*.*)(.*?)\)/gi,
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/,
    /^(https?:\/\/)?(www\.)?(steemitimages\.com)\/.+/,
    /^(https?:\/\/)?(www\.)?(images\.ecency\.com)\/.+/,
    /^(https?:\/\/)?(www\.)?(images-ext-2\.discordapp\.net)\/.+/,
    /^(https?:\/\/)?(www\.)?(images\.hive\.blog)\/.+/,
    /^(https?:\/\/)?(files\.peakd\.com)\/.+/,
    /^(https?:\/\/)?(media\.tenor\.com)\/.+/,
  ];

  return customImageRegexes.some(regex => regex.test(url));
}

export function Markdown({ text }: Props) {
  const { classes } = useStyles()
  const imageRegex = /!\[(.*?)\]\((?!.*\*.*)(.*?)\)/gi
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/
  const steemitRegex = /^(https?:\/\/)?(www\.)?(steemitimages\.com)\/.+/
  const ecencyRegex = /^(https?:\/\/)?(www\.)?(images\.ecency\.com)\/.+/
  const imagesDiscordApp = /^(https?:\/\/)?(www\.)?(images-ext-2\.discordapp\.net)\/.+/
  const hiveBlog = /^(https?:\/\/)?(www\.)?(images\.hive\.blog)\/.+/
  const peakd = /^(https?:\/\/)?(files\.peakd\.com)\/.+/
  const media = /^(https?:\/\/)?(media\.tenor\.com)\/.+/

  const markdownBody = useMemo(() => {
    const replacedBody = text.replace(imageRegex, (match, alt, url) => {
      if (url.match(/\.(png|jpe?g|gif|bmp|svg|webp)$/i) || url.match(media)) {
        return `<div class="${classes.image}"><Image alt="${alt}" src="${url}" className="${classes.responsiveImage}" /></div>`
      } else {
        return match
      }
    }).replace(
      /<center>(.*?)<\/center>/gs,
      '<center>$1</center>'.replace(/"/g, '')
    )

    return (
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[gfm]}
        components={{
          // Render the anchor element for the "a" Markdown element
          a: ({ href, children }: any) => {
            if (
              href.match(/\.(jpg|jpeg|png|gif|bmp|svg)$/i) ||
              href.match(steemitRegex) ||
              href.match(ecencyRegex) ||
              href.match(imagesDiscordApp) ||
              href.match(hiveBlog) ||
              href.match(peakd) ||
              href.match(media)
            ) {
              const width = 'auto'
              const height = 'auto'

              return (
                <div className={classes.image}>
                  <Image
                    src={href}
                    alt="Image"
                    className={classes.responsiveImage}
                    style={{ width, height, borderRadius: 5 }}
                  />
                </div>
              )
            }

            else if (href.match(/^https:\/\/twitter\.com\/[^/]+\/status\/\d+$/)) {
              const tweetId = href.match(/\/status\/(\d+)$/)[1]
              return (
                <div className={classes.tweet}>
                  <Tweet tweetId={tweetId} />
                </div>
              )
            } else if (href.match(youtubeRegex)) {
              const videoId = href.match(/(?:\?v=|\/embed\/|\.be\/)([^&\n?#]+)/)?.[1]
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
                )
              }
            } else if (href.startsWith('@')) {
              const username = href.slice(1)
              return (
                <a href={`https://twitter.com/${username}`} target="_blank" rel="noreferrer" className={classes.link}>
                  {children}
                </a>
              )
            }
            return (
              <a href={href} target="_blank" className={classes.link} rel="noreferrer">
                {children}
              </a>
            )
          },

          table: ({ children }: any) => (
            <Table striped withBorder withColumnBorders>
              {children}
            </Table>
          ),
          th: ({ children }: any) => <th className={classes.tableHeader}>{children}</th>,
          td: ({ children }: any) => <td className={classes.tableCell}>{children}</td>,
          blockquote: ({ children }: any) => {
            console.log(children)
            return (
              <div className={classes.blockquote}>
                <div className={classes.blockquoteIcon}>❝</div>
                <div className={classes.blockquoteText}>{children}</div>
              </div>
            )
          },
          code: ({ children }: any) => {
            return (
              <div className={classes.code}>
                <pre>
                  <code>{children}</code>
                </pre>
              </div>
            )
          },
          hr: () => {
            return <hr className={classes.hr} />
          },
          figure: ({ children, ...props }: any) => <figure {...props}>{children}</figure>,
          p: ({ children }: any) => <div>{children}</div>,
          center: ({ children }: any) => {
            const firstChild = children[0];
            const width = 'auto'
            const height = 'auto'



            if (typeof firstChild === 'string') {
              const urlMatch = firstChild.match(/\[(.*?)\]\(([^)]+)\)/);

              if (urlMatch) {
                const linkText = urlMatch[1];
                const linkUrl = urlMatch[2];
                return (
                  <center>
                    <a href={linkUrl} target='_blank' rel="noreferrer">{linkText}</a>
                  </center>
                );
              } else if (isImageUrl(firstChild) || matchesCustomImageRegex(firstChild)) {
                return (
                  <center>
                    <Image
                      src={firstChild}
                      alt="Image"
                      className={classes.responsiveImage}
                      style={{ width, height, borderRadius: 5 }}
                    />
                  </center>
                );
              } else if (isValidUrl(firstChild)) {
                return (
                  <center>
                    <a href={firstChild} target='_blank' rel="noreferrer">{firstChild}</a>
                  </center>
                );
              }
            }

            // Default case: render the child as is
            return (
              <div>
                <center>{firstChild}</center>
              </div>
            );

          },
        }}
      >
        {replacedBody}
      </ReactMarkdown>
    )
  }, [text])

  return <>{markdownBody}</>
}
