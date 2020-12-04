import React from 'react';
import {Badge, Card, Col, Row} from "react-bootstrap";
import {AiOutlineDislike, AiOutlineLike, AiOutlineShareAlt} from "react-icons/ai";
import {HiOutlineDotsHorizontal} from "react-icons/hi";
import ReactMarkdown from "react-markdown/with-html";
import CodeBlock from "../Post/CodeBlock";
import MarkdownImage from "../Image/MarkdownImage";
import {HeadingRenderer} from "../../utils/helpers";
import Bio from "../Bio";
import CommentBox from "../CommentBox";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngry, faDizzy, faGrinAlt, faSmileWink} from "@fortawesome/free-solid-svg-icons";
import Toc from "react-toc";

const TheDesktopContent = ( props ) => {
    const { post, frontmatter, nextPost, previousPost } = props

    return (
        <Row className="row-post">
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
            <Col xs="12" sm="8" className="p-2">
                <Card className="card-post border-0">
                    <Card.Header className="p-0">
                        <img src={frontmatter.postImage} alt="img-post"/>
                    </Card.Header>
                    <Card.Body className="p-0">
                        <div className="p-4">
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
                            <hr className="mt-4"/>
                        </div>
                        <Bio className="mt-2 p-4"/>
                        <hr className="mt-4 mb-0"/>
                        <CommentBox/>
                    </Card.Body>
                </Card>
                <nav className="flex flex-wrap justify-between mb-10 mt-4">
                    {previousPost ? (
                        <Link href={"/posts/[slug]"} as={`/posts/${previousPost.slug}`}>
                            <a className="text-lg font-light">
                                ← Previous
                            </a>
                        </Link>
                    ) : (
                        <div/>
                    )}
                    {nextPost ? (
                        <Link href={"/posts/[slug]"} as={`/posts/${nextPost.slug}`}>
                            <a className="text-lg font-light">Read next →</a>
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
            <Col xs="12" sm="3" className="p-2">
                <div className="toc">
                    <p className="text-md font-bold mb-2">Table of contents</p>
                    <Toc markdownText={post.content} className="toc-custom"/>
                </div>
            </Col>
        </Row>
    )
}

export default TheDesktopContent