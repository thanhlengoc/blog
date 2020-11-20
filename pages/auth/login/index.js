import React, { useState } from 'react';
import { useRouter } from 'next/router'
import fireDb from "../../../conf/fire-config";
import Layout from "../../../components/Layout";
import SEO from "../../../components/Seo";
import {Card, Form, Button} from "react-bootstrap";
import {toast} from "react-toastify";

export default function Login () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [notify, setNotification] = useState('');
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        fireDb.auth()
            .signInWithEmailAndPassword(username, password)
            .catch((err) => {
                console.log(err.code, err.message)
                toast.error("User không tồn tại!")
                setNotification(err.message)
                setTimeout(() => {
                    setNotification('')
                }, 3000)
            })
        setUsername('')
        setPassword('')
        toast.success("Đăng nhập thành công.")
        router.push("/admin")
    }

    return (
        <Layout>
            <SEO title="Login"/>
            <div className="d-flex justify-content-center mt-10">
                <Card style={{ width: '36rem' }}>
                    <Card.Body className="card-area">
                        {notify}
                        <Form onSubmit={handleLogin}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="email" className="input-search" placeholder="Enter email"
                                              value={username}
                                              onChange= {({target}) => setUsername(target.value)}
                                />
                                <Form.Text className="text-muted">
                                    Vui lòng nhập địa chỉ email của bạn.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password: </Form.Label>
                                <Form.Control type="password" placeholder="Password"
                                              value={password} className="input-search"
                                              onChange={({target}) => setPassword(target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit" style={{float: 'right'}}>
                                Login
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Layout>
    )
}