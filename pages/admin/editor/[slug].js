import React, {useState} from 'react'
import { useRouter } from 'next/router'
import TheLayout from '../../../components/TheLayout'
import SEO from "../../../components/Seo";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown/with-html";
import CodeBlock from "../../../components/Post/CodeBlock";
import {bufferToBase64, loadSuggestions} from "../../../utils/helpers";
import { FaMarkdown } from 'react-icons/fa';
import {Form, Button, Spinner, Modal} from "react-bootstrap";
import { deletePostByDoc,
    getDocBySlug,
    updatePost,
    uploadImageToCloud,
} from "../../../utils/api";
import {toast} from "react-toastify";
import moment from 'moment';
import {HeadingRenderer} from "../../../utils/helpers";


export default function UpdatePost ({post, frontmatter}) {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState("write");
    const [title, setTitle] = useState(frontmatter.title);
    const [tag, setTag] = useState(frontmatter.tag);
    const [description, setDescription] = useState(frontmatter.description);
    const postDate = moment().format("DD/MM/YYYY HH:mm:ss")
    const [content, setContent] = useState(post.content);
    const [loading, setLoading] = useState(false);
    const [delLoading, setDelLoading] = useState(false);
    const srcPreview = frontmatter ? frontmatter.postImage : ""
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const saveToCloud = async function* (data) {
        // Promise that waits for "time" milliseconds
        const wait = function (time) {
            return new Promise((a, r) => {
                setTimeout(() => a(), time);
            });
        };
        const uInt8Array = Array.from(new Uint8Array(data))
        const base64 = bufferToBase64(uInt8Array);
        const req = "data:image/png;base64," + base64

        const response = await uploadImageToCloud(req);
        console.log("response: ", response)

        await wait(2000);
        // yields the URL that should be inserted in the markdown
        yield response.url;
        await wait(2000);
        // returns true meaning that the save was successful
        return true;
    };

    const previewFile = (event) => {
        event.preventDefault();
        const preview = document.getElementById('previewImage');
        const file = document.getElementById("postImage").files[0];
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            // convert image file to base64 string
            preview.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }

    }

    const clearFileInput = () => {
        const file = document.getElementById("postImage");
        const preview = document.getElementById('previewImage');
        file.value = ""
        preview.src = ""
    }

    const handleSubmit = async function (event) {
        event.preventDefault();
        setLoading(true);

        const preview = document.getElementById('previewImage');

        let imageUrl = "";
        if (preview.src.startsWith("data:image")) {
            const imageCloud = await uploadImageToCloud(preview.src)
            imageUrl = imageCloud ? imageCloud.url : ""
        }
        else {
            imageUrl = frontmatter.postImage;
        }

        const frontmatterUpdate = {
            title: title,
            description: description,
            postImage: imageUrl,
            tag: tag,
            date: postDate
        }

        const docId = post.slug;
        await updatePost(docId, frontmatterUpdate, content)
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id)
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                setLoading(false);
            })

        toast.success("Cập nhật thành công")
        setLoading(false);


        setTimeout(() => {
            setLoading(false);
        }, 5000)
    }

    const handleDeletePost = async function (event) {
        event.preventDefault()
        setDelLoading(true)
        await deletePostByDoc(post.slug)
            .then(function() {
                console.log("Document successfully deleted!");
                setTitle('');
                setContent('');
                setTag('');
                setDescription('');
                clearFileInput()
                toast.success("Xoá bài thành công")
                setDelLoading(false)
                handleClose()
                router.push("/admin")
            }).catch(function(error) {
                console.error("Error removing document: ", error);
                handleClose()
                setDelLoading(false)
            });
        setTimeout(() => {
            handleClose()
            setDelLoading(false)
        }, 5000)
    }

    return (
        <TheLayout>
            <SEO title="Create Post" />
            <div style={{paddingTop:'1rem'}}>
                <div className="d-flex">
                    <p className="font-bold mr-auto">Markdown Editor</p>
                    <FaMarkdown size={35}/>
                </div>
                <div className="row mt-1">
                    <div className="col-sm-9">
                        <ReactMde
                            value={content}
                            onChange={setContent}
                            selectedTab={selectedTab}
                            onTabChange={setSelectedTab}
                            generateMarkdownPreview={(markdown) =>
                                Promise.resolve(
                                    <ReactMarkdown className="mb-4 prose-sm prose sm:prose lg:prose-lg"
                                                   escapeHtml={false}
                                                   source={markdown}
                                                   renderers={{ code: CodeBlock, heading: HeadingRenderer }}
                                    />)
                            }
                            loadSuggestions={loadSuggestions}
                            childProps={{
                                writeButton: {
                                    style: {padding: '5px', color: '#000'}
                                },
                                previewButton: {
                                    style: {padding: '5px', color: '#000'}
                                },
                                textArea: {
                                    style: {background: '#E1EFF1', minHeight: "500px", color: '#000'}
                                }
                            }}
                            paste={{saveImage: saveToCloud}}
                        />
                    </div>
                    <div className="col-sm-3">
                        <Form id="form-prefix">
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" className="input-frontmatter"
                                              value={title}
                                              onChange={(e)=> setTitle(e.target.value)}
                                              placeholder="Title.." required />
                                <Form.Text className="text-muted">
                                    Tiêu đề của bài viết.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="tag">
                                <Form.Label>Tag</Form.Label>
                                <Form.Control type="text" className="input-frontmatter"
                                              value={tag}
                                              onChange={(e)=> setTag(e.target.value)}
                                              placeholder="Ex: Front-end or Back-end .." required />
                                <Form.Text className="text-muted">
                                    Đánh dấu bài viết theo chủ đề
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} className="input-frontmatter"
                                              value={description}
                                              onChange={(e) => setDescription(e.target.value)}
                                              placeholder="Nội dung chính của bài viết.." required />
                            </Form.Group>

                            <Form.Group controlId="datePost">
                                <Form.Label>Date post:</Form.Label>
                                <Form.Control className="input-frontmatter" type="text" value={postDate} disabled />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Post image:</Form.Label>
                                <Form.Control type="file" className="input-frontmatter"
                                              id="postImage"
                                              name="postImage"
                                              onChange={previewFile}
                                              accept="image/*" />
                                <img className="mt-1" id="previewImage" src={srcPreview} height="150px" alt="Image preview..."/>
                                <a href="#" onClick={clearFileInput}>Clear File</a>
                            </Form.Group>

                            <div className="d-flex flex-row">
                                <Button variant="outline-primary"
                                        size="sm" className="mr-2"
                                        type="submit"
                                        disabled={loading}
                                        onClick={handleSubmit}>
                                    {
                                        loading ?
                                            <>
                                                <Spinner className="mr-2" animation="grow" size="sm" /> Updating
                                            </>
                                            : <>Update</>
                                    }
                                </Button>
                                <Button variant="outline-danger"
                                        size="sm" className="mr-2"
                                        onClick={handleShow}>
                                    Delete
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Xoá bài viết</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Bạn có chắc chắn muốn xoá bài viết: {title} ?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" size="sm" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" size="sm"
                                disabled={delLoading}
                                onClick={handleDeletePost}>
                            {
                                delLoading ?
                                    <>
                                        <Spinner className="mr-2" animation="grow" size="sm" /> Deleting..
                                    </>
                                    : <>Delete</>
                            }
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </TheLayout>
    )
}

export async function getServerSideProps ({ query }) {
    console.log("Index Component Called")
    const postData = await getDocBySlug(query.slug);
    return { props: postData };
}