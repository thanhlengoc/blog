import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown/with-html";
import Layout from "components/Layout";
import SEO from "components/Seo";
import Bio from "components/Bio";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngry, faGrinAlt, faSmileWink, faDizzy} from '@fortawesome/free-solid-svg-icons'
import {Badge, Col, Row} from "react-bootstrap";
import CodeBlock from "../../../components/CodeBlock";
import MarkdownImage from "../../../components/MarkdownImage";
import Toc from 'react-auto-toc'
import {getPostBySlug} from "../../../utils/apiUtils";

export default function PostFire({post, frontmatter, nextPost, previousPost}) {

    const content = '# test \n your markdown Content # test2\n';

    return (
        <Layout>
            <SEO
                title={frontmatter.title}
                description={frontmatter.description || post.excerpt}
            />
            <Row>
                <Col xs={"12"} sm={"9"}>
                    <article style={{paddingTop: '1.7rem'}}>
                        <header className="mb-8">
                            <h1 className="mb-2 text-5xl font-black leading-none font-display">
                                {frontmatter.title}
                            </h1>
                            <div style={{display: 'flex'}}>
                                <Badge className="mr-2" variant="warning"
                                       style={{height: 'fit-content'}}>{frontmatter.tag}</Badge>
                                <p className="text-sm">{frontmatter.date}</p>
                            </div>
                        </header>
                        <ReactMarkdown
                            className="mb-4 prose-sm prose sm:prose lg:prose-lg"
                            escapeHtml={false}
                            source={post.content}
                            renderers={{code: CodeBlock, image: MarkdownImage}}
                        />
                        <hr className="mt-4"/>
                        <footer>
                            <Bio className="mt-8 mb-10"/>
                        </footer>
                    </article>
                    <nav className="flex flex-wrap justify-between mb-10">
                        {previousPost ? (
                            <Link href={"/posts/content/[slug]"} as={`/posts/content/${previousPost.slug}`}>
                                <a className="text-lg font-light">
                                    ← {previousPost.frontmatter.title}
                                </a>
                            </Link>
                        ) : (
                            <div/>
                        )}
                        {nextPost ? (
                            <Link href={"/posts/content/[slug]"} as={`/posts/content/${nextPost.slug}`}>
                                <a className="text-lg font-light">{nextPost.frontmatter.title} →</a>
                            </Link>
                        ) : (
                            <div/>
                        )}
                    </nav>
                    <hr className="mt-4"/>
                    <footer>
                        <div className="row justify-content-center" style={{padding: '20px'}}>
                            <h5>What is helpful?</h5>
                        </div>
                        <div className="row justify-content-center" style={{paddingBottom: '50px'}}>
                            <FontAwesomeIcon icon={faAngry} className="emoji-react"/>
                            <FontAwesomeIcon icon={faGrinAlt} className="emoji-react"/>
                            <FontAwesomeIcon icon={faSmileWink} className="emoji-react"/>
                            <FontAwesomeIcon icon={faDizzy} className="emoji-react"/>
                        </div>
                    </footer>
                </Col>
                <Col xs={"12"} sm={"3"}>
                    <div className="toc">
                        <h5>Table of contents</h5>
                        <Toc markdownText={content}/>
                    </div>
                </Col>
            </Row>

        </Layout>
    );
}

// export async function getStaticPaths() {
//     const allPosts = await allPostFromFire();
//     const paths = allPosts.map((item) => ({
//         params: {
//             slug: item.slug,
//         },
//     }))
//     // generate the paths for the pages you want to render
//     return {
//         paths: paths,
//         fallback: false,
//     };
// }
//
// export async function getStaticProps({params: {slug}}) {
//     const postData = await getPostBySlug(slug);
//
//     if (!postData.previousPost) {
//         postData.previousPost = null;
//     }
//
//     if (!postData.nextPost) {
//         postData.nextPost = null;
//     }
//
//     return { props: postData };
// }

export const getServerSideProps = async ({ query }) => {
    const postData = await getPostBySlug(query.slug);

    if (!postData.previousPost) {
        postData.previousPost = null;
    }

    if (!postData.nextPost) {
        postData.nextPost = null;
    }

    return { props: postData };
}