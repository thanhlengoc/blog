import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown/with-html";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import Layout from "components/Layout";
import Image from "components/Image";
import SEO from "components/Seo";
import { getPostBySlug, getPostsSlugs } from "utils/posts";
import Bio from "components/Bio";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngry, faGrinAlt, faSmileWink, faDizzy } from '@fortawesome/free-solid-svg-icons'


const CodeBlock = ({ language, value }) => {
  return <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>;
};

const MarkdownImage = ({ alt, src }) => (
  <Image
    alt={alt}
    src={require(`../../content/assets/${src}`)}
    webpSrc={require(`../../content/assets/${src}?webp`)}
    previewSrc={require(`../../content/assets/${src}?lqip`)}
    className="w-full"
  />
);

export default function Post({ post, frontmatter, nextPost, previousPost }) {
  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description || post.excerpt}
      />

      <article style={{paddingTop:'1.7rem'}}>
        <header className="mb-8">
          <h1 className="mb-2 text-4xl font-black leading-none font-display">
            {frontmatter.title}
          </h1>
          <p className="text-sm">{frontmatter.date}</p>
        </header>
        <ReactMarkdown
          className="mb-4 prose-sm prose sm:prose lg:prose-lg"
          escapeHtml={false}
          source={post.content}
          renderers={{ code: CodeBlock, image: MarkdownImage }}
        />
        <hr className="mt-4" />
        <footer>
          <Bio className="mt-8 mb-16" />
        </footer>
      </article>
      <nav className="flex flex-wrap justify-between mb-10">
        {previousPost ? (
          <Link href={"/post/[slug]"} as={`/post/${previousPost.slug}`}>
            <a className="text-lg font-light">
              ← {previousPost.frontmatter.title}
            </a>
          </Link>
        ) : (
          <div />
        )}
        {nextPost ? (
          <Link href={"/post/[slug]"} as={`/post/${nextPost.slug}`}>
            <a className="text-lg font-light">{nextPost.frontmatter.title} →</a>
          </Link>
        ) : (
          <div />
        )}
      </nav>
      <hr className="mt-4" />
      <footer>
        <div className="row justify-content-center" style={{padding:'20px'}}>
          <h5>What is helpful?</h5>
        </div>
        <div className="row justify-content-center" style={{paddingBottom:'50px'}}>
          <FontAwesomeIcon icon={faAngry} className="emoji-react" />
          <FontAwesomeIcon icon={faGrinAlt} className="emoji-react" />
          <FontAwesomeIcon icon={faSmileWink} className="emoji-react" />
          <FontAwesomeIcon icon={faDizzy} className="emoji-react" />
        </div>
      </footer>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getPostsSlugs("/all-posts");
  // generate the paths for the pages you want to render
  return {
    paths,
    fallback: false, // false if you know all the slugs that you want to generate ahead of time
  };
}

export async function getStaticProps({ params: { slug } }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1

  const postData = getPostBySlug(slug, "/all-posts");

  if (!postData.previousPost) {
    postData.previousPost = null;
  }

  if (!postData.nextPost) {
    postData.nextPost = null;
  }

  return { props: postData };
}
