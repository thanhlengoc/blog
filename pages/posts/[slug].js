import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown/with-html";
import TheLayout from "components/TheLayout";
import SEO from "components/Seo";
import Bio from "components/Bio";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngry, faGrinAlt, faSmileWink, faDizzy} from '@fortawesome/free-solid-svg-icons'
import {Badge, Card, Col, Row} from "react-bootstrap";
import CodeBlock from "../../components/Post/CodeBlock";
import MarkdownImage from "../../components/Image/MarkdownImage";
import Toc from 'react-toc'
import {getPostBySlug} from "../../utils/api";
import {AiOutlineLike, AiOutlineDislike, AiOutlineShareAlt} from "react-icons/ai";
import {HiOutlineDotsHorizontal} from "react-icons/hi"
import Image from "../../components/Image/Image";
import {HeadingRenderer} from "../../utils/helpers";
import useWindowSize from "../../utils/useWindowSize";

export default function PostSlug({post, frontmatter, nextPost, previousPost}) {
    const windowSize = useWindowSize();

    return (
        <TheLayout>
            <SEO
                title={frontmatter.title}
                description={frontmatter.description || post.excerpt}
            />
            <Row className="row-post">
                {
                    windowSize.width > 600 ?
                        <Col xs="12" sm='1' className="p-2">
                            <div className="reaction text-center">
                                <AiOutlineLike className="react-sidebar mb-3"/>
                                <p>0</p>
                                <AiOutlineDislike className="react-sidebar mb-3"/>
                                <p>0</p>
                                <AiOutlineShareAlt className="react-sidebar mb-3"/>
                                <p>0</p>
                                <HiOutlineDotsHorizontal className="react-sidebar mb-3"/>
                            </div>
                        </Col>
                        : null
                }
                <Col xs={windowSize.width <= 600 ? {order: "last"} : "12"} sm="8" className="p-2">
                    <Card className="card-post border-0">
                        <Card.Header className="p-0">
                            <Image src={frontmatter.postImage}
                                   previewSrc={frontmatter.postImage} alt="img-post"/>
                        </Card.Header>
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
                                    renderers={{code: CodeBlock, image: MarkdownImage, heading: HeadingRenderer}}
                                />
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
                <Col xs={windowSize.width <= 600 ? {order: "first"} : "12"} sm="3" className="p-4">
                    <div className="toc">
                        <h5>Table of contents</h5>
                        <Toc markdownText={post.content} className="toc-custom"/>
                    </div>
                    {/*<Card className="toc card-post">*/}
                    {/*    <Card.Body>*/}
                    {/*        <h5>Table of contents</h5>*/}
                    {/*        <Toc markdownText={post.content} className="toc-custom"/>*/}
                    {/*    </Card.Body>*/}
                    {/*</Card>*/}
                </Col>
            </Row>

        </TheLayout>
    );
}

export async function getServerSideProps ({ query }) {
    console.log("ssr posts/slug Component query: ", JSON.stringify(query))
    const postData = await getPostBySlug(query.slug);

    if (!postData.previousPost) {
        postData.previousPost = null;
    }
    if (!postData.nextPost) {
        postData.nextPost = null;
    }

    return { props: postData };
}