import React, {useEffect, useState} from 'react'
import Layout from "../../components/Layout";
import SEO from "../../components/Seo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {Badge, Col, Row} from "react-bootstrap";
import fireDb from "../../conf/fire-config";
import {toast} from "react-toastify";
import {allPostFromFire, onLogout} from "../../utils/apiUtils";

export default function Admin({allPosts}) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    // const [blogs, setBlogs] = useState([]);
    // const [loading, setLoading] = useState(false);

    fireDb.auth()
        .onAuthStateChanged((user) => {
            if (user) {
                console.log("user: ", user.email)
                setUserEmail(user.email)
                setLoggedIn(true)
            } else {
                setLoggedIn(false)
            }
        })

    const handleLogout = () => {
        onLogout().then(() => {
                toast.success("Đăng xuất thành công.")
            });
    }

    return (
        <Layout>
            <SEO title="Admin Page"/>
            {
                loggedIn ?
                    <div className="pt-4">
                        <div className="d-flex">
                            <p className="font-bold mr-auto">Posts by: {userEmail}</p>
                            <a href="/create-post" className="mr-2">
                                <FontAwesomeIcon icon={faPlus}/> New Post
                            </a> |
                            <a className="ml-2" onClick={handleLogout}>
                                <FontAwesomeIcon icon={faSignOutAlt}/> Logout
                            </a>
                        </div>
                        <hr className="mt-3 mb-3"/>
                        <Row>
                            <Col xs='12' sm='12'>
                                {
                                    allPosts.map(({frontmatter: {title, description, tag, date}, slug}) => (
                                        <article key={slug}>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <header>
                                                        <h4>
                                                            <Link href={`/update-post/[slug]`}
                                                                  as={`/update-post/${slug}`}>
                                                                <a className="text-xl font-bold font-display title-post">
                                                                    {title}
                                                                </a>
                                                            </Link>
                                                        </h4>
                                                        <div className="d-flex flex-row">
                                                            <Badge className="mr-2" style={{height: 'fit-content'}}
                                                                   variant="warning">{tag}</Badge>
                                                            <span className="text-sm mr-2">{date}</span>
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
                    :
                    <div className="d-flex justify-content-end pt-4">
                        <Link href="/auth/login">
                            <a className="mr-2" style={{fontSize: '18px'}}> Login</a>
                        </Link> |
                        <Link href="/auth/register">
                            <a className="ml-2" style={{fontSize: '18px'}}> Register</a>
                        </Link>
                    </div>
            }
        </Layout>
    )
}

export async function getServerSideProps() {
    const allPosts = await allPostFromFire()
    return {
        props: { allPosts },
    }
}