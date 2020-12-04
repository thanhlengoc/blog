import React from 'react';
import {Card, Col, Row} from "react-bootstrap";
import Link from "next/link";
import Bio from "../Bio";
import Sidebar from "../Sidebar/Sidebar";

const DesktopHomePage = ( props ) => {
    const {allPosts} = props

    return (
        <Row className="row-post">
            <Col xs='12' sm='2' className="p-2">
                <div className="left-bar">
                    <p className="font-weight-bold">SignIn / SignUp</p>
                    <p>Listings</p>
                    <p className="font-weight-bold mt-4">Popular tags</p>
                    <p>#java</p>
                    <p>#docker</p>
                    <p>#prometheus</p>
                    <p>#grafana</p>
                    <p>#eureka</p>
                    <p>#consul</p>
                    <p>#reactjs</p>
                    <p>#javascript</p>
                    <p>#sql</p>
                    <p>#kafka</p>
                </div>
            </Col>
            <Col xs='12' sm='7' className="p-2">
                <div className="d-flex mb-2">
                    <Link href="/">
                        <a className="text-xl mr-auto font-bold posts-title">Posts</a>
                    </Link>
                    <Link href="/">
                        <a className="feed-menu">Feed</a>
                    </Link>
                    <Link href="/">
                        <a className="feed-menu">Week</a>
                    </Link>
                    <Link href="/">
                        <a className="feed-menu">Month</a>
                    </Link>
                    <Link href="/">
                        <a className="feed-menu">Year</a>
                    </Link>

                </div>
                {
                    allPosts.map(({frontmatter: {title, description, postImage, tag, date}, slug}) => (
                        <Card className="card-post mb-2" key={slug}>
                            <Card.Body className="p-3">
                                <article>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <img src={postImage} alt={"post"}/>
                                        </div>
                                        <div className="col-sm-9">
                                            <header className="mb-2">
                                                <h3 className="mb-1">
                                                    <Link
                                                        href={`/posts/[slug]`}
                                                        as={`/posts/${slug}`}>
                                                        <a className="text-xl font-bold font-display title-post">
                                                            {title}
                                                        </a>
                                                    </Link>
                                                </h3>
                                                <span className="tag-post mr-2">#{tag}</span>
                                                <p className="text-md mt-1 mb-2">{description}...</p>
                                            </header>
                                            <section className="text-right">
                                                <span className="tag-post">{date}</span>
                                            </section>
                                        </div>
                                    </div>
                                </article>
                            </Card.Body>
                        </Card>
                    ))
                }
                <hr className="mt-3 mb-3"/>
                <footer>
                    <Bio className="mt-8 mb-16"/>
                </footer>
            </Col>
            <Col xs='12' sm='3' className="p-2">
                <Sidebar/>
            </Col>
        </Row>
    )
}

export default DesktopHomePage