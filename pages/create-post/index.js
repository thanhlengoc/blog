import React, {useState} from 'react'
import Layout from '../../components/Layout'
import SEO from "../../components/Seo";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown/with-html";
import CodeBlock from "../../components/CodeBlock";
import {bufferToBase64, loadSuggestions} from "../../utils/createPostUtils";
import { FaMarkdown } from 'react-icons/fa';
import {Form, Button, Spinner} from "react-bootstrap";
import {uploadImageToCloud, uploadPost} from "../../utils/apiUtils";
import {toast} from "react-toastify";
import {uniqDocId} from "../../conf/constants";
import moment from 'moment';

export default function CreatePost () {
    const [selectedTab, setSelectedTab] = useState("write");
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('');
    const [description, setDescription] = useState('');
    const postDate = moment().format("DD/MM/YYYY HH:mm:ss")
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false)

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
        const preview = document.getElementById('previewImage');

        setLoading(true);
        const imageCloud = preview.src !== "" ? await uploadImageToCloud(preview.src) : null
        const imageUrl = imageCloud ? imageCloud.url : ""
        const frontmatter = {
            title: title,
            description: description,
            postImage: imageUrl,
            tag: tag,
            date: postDate
        }

        const docId = title.replace(/\s/g, '-').toLowerCase() + "-" + uniqDocId;

        await uploadPost(docId, frontmatter, content)
                .then(function() {
                        console.log("Document successfully written!")
                        setTitle('');
                        setContent('');
                        setTag('');
                        setDescription('');
                        clearFileInput()
                        toast.success("Đăng bài thành công")
                        setLoading(false);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                    toast.error("Opp! Something when wrong. Please try again!")
                    setLoading(false);
                })


        setTimeout(() => {
            toast.warning("Quá thời gian đăng bài.")
            setLoading(false);
        }, 10000)
    }

    return (
        <Layout>
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
                                                   renderers={{ code: CodeBlock }}
                                    />)
                            }
                            loadSuggestions={loadSuggestions}
                            childProps={{
                                writeButton: {
                                    style: {padding: '5px'}
                                },
                                previewButton: {
                                    style: {padding: '5px'}
                                },
                                textArea: {
                                    style: {background: '#E1EFF1', minHeight: "500px"}
                                }
                            }}
                            paste={{saveImage: saveToCloud}}
                        />
                    </div>
                    <div className="col-sm-3">
                        <Form id="form-prefix">
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text"
                                              value={title}
                                              onChange={(e)=> setTitle(e.target.value)}
                                              placeholder="Title.." required />
                                <Form.Text className="text-muted">
                                    Tiêu đề của bài viết.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="tag">
                                <Form.Label>Tag</Form.Label>
                                <Form.Control type="text"
                                              value={tag}
                                              onChange={(e)=> setTag(e.target.value)}
                                              placeholder="Ex: Front-end or Back-end .." required />
                                <Form.Text className="text-muted">
                                    Đánh dấu bài viết theo chủ đề
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3}
                                              value={description}
                                              onChange={(e) => setDescription(e.target.value)}
                                              placeholder="Nội dung chính của bài viết.." required />
                            </Form.Group>

                            <Form.Group controlId="datePost">
                                <Form.Label>Date post:</Form.Label>
                                <Form.Control type="text" value={postDate} disabled />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Post image:</Form.Label>
                                <Form.Control type="file"
                                              id="postImage"
                                              name="postImage"
                                              onChange={previewFile}
                                              accept="image/*" />
                                <img className="mt-1" id="previewImage" src="" height="150px" alt="Image preview..."/>
                                <a href="#" onClick={clearFileInput}>Clear File</a>
                            </Form.Group>

                            <Button variant="outline-primary"
                                    size="sm" type="submit"
                                    disabled={loading}
                                    onClick={handleSubmit}>
                                {
                                    loading ?
                                        <>
                                            <Spinner className="mr-2" animation="grow" size="sm" /> Posting
                                        </>
                                         : <>Public post</>
                                }
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
