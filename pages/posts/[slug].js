import React, {useEffect, useState} from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown/with-html";
import Layout from "components/Layout";
import SEO from "components/Seo";
import Bio from "components/Bio";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngry, faGrinAlt, faSmileWink, faDizzy} from '@fortawesome/free-solid-svg-icons'
import {Badge, Card, Col, Row} from "react-bootstrap";
import CodeBlock from "../../components/CodeBlock";
import MarkdownImage from "../../components/MarkdownImage";
import Toc from 'react-toc'
import {getPostBySlug} from "../../utils/apiUtils";
import {AiOutlineLike, AiOutlineDislike, AiOutlineShareAlt} from "react-icons/ai";
import {HiOutlineDotsHorizontal} from "react-icons/hi"

export default function PostFire({post, frontmatter, nextPost, previousPost}) {

    // const [showReaction, setShowReaction] = useState(true)

    // const previous = previousPost.frontmatter.title && previousPost.frontmatter.title.length >= 25 ?
    //                     previousPost.frontmatter.title.substring(0, 21) + "..." : previousPost.frontmatter.title
    //
    // const next = nextPost.frontmatter.title && nextPost.frontmatter.title.length >= 25 ?
    //     nextPost.frontmatter.title.substring(0, 21) + "..." : nextPost.frontmatter.title

    // useEffect(() => {
    //     console.log("window.innerWidth", window.innerWidth);
    //     if (window.innerWidth < 500) {
    //         setShowReaction(false)
    //     }
    // }, [])


    return (
        <Layout>
            <SEO
                title={frontmatter.title}
                description={frontmatter.description || post.excerpt}
            />
            <Row style={{paddingTop: '1.7rem'}}>
                {
                    showReaction ?
                        <Col xs="12" sm='1' className="text-center">
                            <div className="reaction">
                                <AiOutlineLike className="emoji-react mb-3"/>
                                <p>0</p>
                                <AiOutlineDislike className="emoji-react mb-3"/>
                                <p>0</p>
                                <AiOutlineShareAlt className="emoji-react mb-3"/>
                                <p>0</p>
                                <HiOutlineDotsHorizontal className="emoji-react mb-3"/>
                            </div>
                        </Col>
                        : null
                }
                <Col xs="12" sm="8">
                    <Card className="card-post">
                        <Card.Body>
                            <article>
                                <header className="mb-8">
                                    <h1 className="mb-2 text-4xl font-black leading-none font-display">
                                        {frontmatter.title}
                                    </h1>
                                    <div style={{display: 'flex'}}>
                                        <Badge className="mr-2" variant="warning"
                                               style={{height: 'fit-content'}}>{frontmatter.tag}</Badge>
                                        <p className="text-sm mr-2">Author: Admin</p>
                                        <p className="text-sm">{frontmatter.date}</p>
                                    </div>
                                </header>
                                <ReactMarkdown
                                    className="mb-4 prose-sm prose sm:prose lg:prose-lg"
                                    escapeHtml={false}
                                    source={post.content}
                                    renderers={{code: CodeBlock, image: MarkdownImage}}
                                />
                                {/*<hr className="mt-4"/>*/}
                                {/*<footer>*/}
                                {/*    <Bio className="mt-8 mb-10"/>*/}
                                {/*</footer>*/}
                            </article>
                        </Card.Body>
                    </Card>
                    <Card className="card-post mt-4">
                        <Card.Body>
                            <Bio className="mt-4 mb-4"/>
                        </Card.Body>
                    </Card>
                    <nav className="flex flex-wrap justify-between mb-10 mt-4">
                        {previousPost ? (
                            <Link href={"/posts/[slug]"} as={`/posts/${previousPost.slug}`}>
                                <a className="text-lg font-light">
                                    ← {previousPost.frontmatter.title}
                                </a>
                            </Link>
                        ) : (
                            <div/>
                        )}
                        {nextPost ? (
                            <Link href={"/posts/[slug]"} as={`/posts/${nextPost.slug}`}>
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
                    <Card className="toc card-post">
                        <Card.Body>
                            <h5>Table of contents</h5>
                            <Toc markdownText={post.content} className="toc-custom"/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Layout>
    );
}

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