import React, { useState } from 'react';
import { useRouter } from 'next/router';
import fireDb from "../../conf/fire-config";
import TheLayout from "../../components/TheLayout";
import SEO from "../../components/Seo";
import {Button, Card, Form} from "react-bootstrap";
import {toast} from "react-toastify";

function Register () {
    const router = useRouter();
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passConf, setPassConf] = useState('');
    const [notification, setNotification] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (password !== passConf) {
            setNotification(
                'Password and password confirmation does not   match'
            )
            toast.error("Password and password confirmation does not match")
            setTimeout(() => {
                setNotification('')
            }, 2000)
            setPassword('');
            setPassConf('');
            return null;
        }
        fireDb.auth()
            .createUserWithEmailAndPassword(userName, password)
            .catch((err) => {
                console.log(err.code, err.message)
            });
        toast.success("Đăng ký thành công. Vui lòng đăng nhập.")
        router.push("/auth/login")
    }

    return (
        <TheLayout>
            <SEO title="Register"/>
            <div className="d-flex justify-content-center mt-10">
                <Card style={{ width: '36rem' }}>
                    <Card.Body className="card-area">
                        {notification}
                        <Form onSubmit={handleLogin}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email: </Form.Label>
                                <Form.Control type="email" placeholder="Enter email"
                                              value={userName} className="input-search"
                                              onChange={({target}) => setUsername(target.value)}
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
                            <Form.Group controlId="formBasicPasswordConf">
                                <Form.Label>Confirm Password: </Form.Label>
                                <Form.Control type="password" placeholder="Password"
                                              value={passConf} className="input-search"
                                              onChange={({target}) => setPassConf(target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" style={{float: 'right'}}>
                                Register
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </TheLayout>
    )
}

export default Register