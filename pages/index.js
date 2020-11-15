import Layout from 'components/Layout';
import React from 'react'
import SEO from "components/Seo";
import Bio from '../components/Bio'
import {getSortedPosts} from "../utils/posts";
import Link from "next/link";
import {Badge, Col, Row} from "react-bootstrap";
import Paging from "../components/Paging";
import Sidebar from "../components/Sidebar";

export default function Home({posts}) {
    // console.log("posts: ", posts)
    return (
        <Layout>
            <SEO title="Web Dev"/>
                <Row style={{paddingTop: '1.7rem'}}>
                    <Col xs='12' sm='9'>
                        {posts.map(({frontmatter: {title, description, postImage, tag, date}, slug}) => (
                            <article key={slug}>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <img src={postImage} alt={"post"}/>
                                    </div>
                                    <div className="col-sm-8">
                                        <header className="mb-2">
                                            <h3 className="mb-2">
                                                <Link
                                                    href={`/post/[slug]`}
                                                    as={`/post/${slug}`}
                                                >
                                                    <a className="text-2xl font-bold font-display"
                                                       style={{color: '#000'}}>
                                                        {title}
                                                    </a>
                                                </Link>
                                            </h3>
                                            <Badge variant="info">{tag}</Badge>{' / '}
                                            <span className="text-sm font-bold" style={{color: "#6C757D"}}>{date}</span>
                                        </header>
                                        <section>
                                            <p className="mb-8 text-md">{description}</p>
                                        </section>
                                    </div>
                                </div>
                                <hr className="mt-3 mb-3"/>
                            </article>
                        ))}
                        <Paging/>
                        <hr className="mt-3 mb-3" />
                        <footer>
                            <Bio className="mt-8 mb-16"/>
                        </footer>
                    </Col>
                    <Col xs='12' sm='3'>
                        <Sidebar/>
                    </Col>
                </Row>
        </Layout>
    )
}

export async function getStaticProps() {
    const posts = getSortedPosts("");
    return {
        props: {
            posts,
        },
    };
}

