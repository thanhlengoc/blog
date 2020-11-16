import React from 'react'
import Layout from "../../components/Layout";
import SEO from "../../components/Seo";
import {allPostFromFire} from "../../utils/apiUtils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {Badge, Col, Row} from "react-bootstrap";

export default function Admin ( {allPosts} ) {

    return (
        <Layout>
            <SEO title="Admin Page"/>
            <div style={{paddingTop:'1rem'}}>
                <div className="d-flex">
                    <p className="font-bold mr-auto">Post by Admin</p>
                    <a href="/create-post">
                        <FontAwesomeIcon icon={faPlus}/> New Post
                    </a>
                </div>
                <hr className="mt-3 mb-3" />
                <Row>
                    <Col xs='12' sm='12'>
                        {allPosts.map(({frontmatter: {title, description, postImage, tag, date}, slug}) => (
                            <article key={slug}>
                                <div className="row">
                                    <div className="col-sm-8">
                                        <header>
                                            <h4>
                                                <Link href={`/update-post/[slug]`}
                                                      as={`/update-post/${slug}`}>
                                                    <a className="text-xl font-bold font-display" style={{color: '#000'}}>
                                                        {title}
                                                    </a>
                                                </Link>
                                            </h4>
                                            <div className="d-flex flex-row">
                                                <Badge className="mr-2" style={{height: 'fit-content'}} variant="secondary">{tag}</Badge>
                                                <span className="text-sm mr-2" style={{color: "#6C757D"}}>{date}</span>
                                                <p className="text-md mb-0 mr-2">{description}</p>
                                            </div>
                                        </header>

                                    </div>
                                </div>
                                <hr className="mt-2 mb-2"/>
                            </article>
                        ))}
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    const allPosts = await allPostFromFire()
    return {
        props: { allPosts },
    }
}