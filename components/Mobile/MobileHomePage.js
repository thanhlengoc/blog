import React from 'react';
import {Card, Col, Row} from "react-bootstrap";
import Link from "next/link";
import Bio from "../Bio";
import Sidebar from "../Sidebar/Sidebar";
import {useRouter} from "next/router";

const selectOptions = [
    { value: '/', label: 'Feed' },
    { value: '/', label: 'Week' },
    { value: '/', label: 'Month' },
    { value: '/', label: 'Year' },
]

const MobileHomePage = ( props ) => {
    const {allPosts} = props
    const router = useRouter();

    const onchangeSelect = (e) => {
        e.preventDefault();
        router.push(e.target.value)
    }

    return (
        <Row className="row-post">
            <Col xs='12' sm='8' className="p-0">
                <div className="d-flex mb-2 px-2">
                    <Link href="/">
                        <a className="text-xl mr-auto font-bold posts-title">Posts</a>
                    </Link>
                            <select id="select-options" className="selected-news"
                                    onChange={onchangeSelect}>
                                {
                                    selectOptions.map((item, id) => {
                                        return <option value={item.value} key={id}>{item.label}</option>
                                    })
                                }
                            </select>
                </div>
                {
                    allPosts.map(({frontmatter: {title, description, postImage, tag, date}, slug}) => (
                        <Card className="card-post mb-3 border-0 rounded-0" key={slug}>
                            <Card.Body className="p-0">
                                <article>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <img src={postImage} alt={"post"}/>
                                        </div>
                                        <div className="col-sm-9">
                                            <div className="p-3">
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
                                    </div>
                                </article>
                            </Card.Body>
                        </Card>
                    ))
                }
                <footer>
                    <Bio className="mt-8 mb-10 px-2"/>
                </footer>
            </Col>
            <Col xs='12' sm='4' className="p-0">
                <Sidebar/>
            </Col>
        </Row>
    )
}

export default MobileHomePage