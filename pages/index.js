import Layout from 'components/Layout';
import React from 'react'
import SEO from "components/Seo";
import Bio from '../components/Bio'
import Link from "next/link";
import {Badge, Card, Col, Row} from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import {allPostFromFire} from "../utils/apiUtils";

export default function Home({allPosts}) {

    return (
        <Layout>
            <SEO title="Newest post"/>
            <Row style={{paddingTop: '1.7rem'}}>
                <Col xs='12' sm='9'>
                    <div className="d-flex mb-2">
                        <h5 className="pt-2 pr-2 mr-auto font-bold">Posts</h5>
                        <div className="p-2 font-bold">Feed</div>
                        <div className="p-2 ">Week</div>
                        <div className="p-2 ">Month</div>
                        <div className="pt-2 pl-2 pb-2">Year</div>
                    </div>
                    {
                        allPosts.map(({frontmatter: {title, description, postImage, tag, date}, slug}) => (
                            <Card className="card-post mb-2" key={slug}>
                                <Card.Body>
                                    <article>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <img src={postImage} alt={"post"}/>
                                            </div>
                                            <div className="col-sm-9">
                                                <header className="mb-2">
                                                    <h3 className="mb-2">
                                                        <Link
                                                            href={`/posts/[slug]`}
                                                            as={`/posts/${slug}`}
                                                        >
                                                            <a className="text-xl font-bold font-display title-post">
                                                                {title}
                                                            </a>
                                                        </Link>
                                                    </h3>
                                                    <Badge variant="info">{tag}</Badge>{' | '}
                                                    <span className="text-sm font-bold" style={{color: "#6C757D"}}>{date}</span>
                                                </header>
                                                <section>
                                                    <p className="text-md">{description}</p>
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
                <Col xs='12' sm='3'>
                    <Sidebar/>
                </Col>
            </Row>
        </Layout>
    )
}

export async function getServerSideProps() {
    const allPosts = await allPostFromFire()
    return {
        props: {allPosts},
    }
}


