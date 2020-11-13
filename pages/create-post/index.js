import React from 'react'
import Layout from '../../components/Layout'
import SEO from "../../components/Seo";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown/with-html";
import CodeBlock from "../../components/CodeBlock";
import {loadSuggestions} from "../../utils/createPostUtils";
import { FaMarkdown } from 'react-icons/fa';
import {cloudinaryUrl, unsignedUploadPreset} from "../../conf/constants";

function bufferToBase64(buf) {
    let binstr = Array.prototype.map.call(buf, function (ch) {
        return String.fromCharCode(ch);
    }).join('');
    return btoa(binstr);
}

export default function CreatePost () {
    const [value, setValue] = React.useState(
        "---\n" +
        "title: \n" +
        "description: \n" +
        "postImage: \n" +
        "tag: \n" +
        "date: 2020-11-07T11:00:00.000Z\n" +
        "---"
    );
    const [selectedTab, setSelectedTab] = React.useState("write");

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

        const fd = new FormData();
        fd.append('file', req);
        fd.append('upload_preset', unsignedUploadPreset);
        fd.append('tags', 'browser_upload');
        const options = {
            method: "POST", body: fd
        }
        const response = await fetch(cloudinaryUrl, options)
            .then((res) => {
                return res.json();
            })
        console.log("response: ", response)
        await wait(2000);
        // yields the URL that should be inserted in the markdown
        yield response.url;
        await wait(2000);
        // returns true meaning that the save was successful
        return true;
    };

    return (
        <Layout>
            <SEO title="Create Post" />
            <div style={{paddingTop:'1rem'}}>
                <div className="d-flex justify-content-between">
                    <p className="font-bold">Markdown Editor</p>
                    <FaMarkdown size={35}/>
                    <a href={"/create-post"}>Public post</a>
                </div>
                <ReactMde
                    value={value}
                    onChange={setValue}
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
                        }
                    }}
                    paste={{saveImage: saveToCloud}}
                    minEditorHeight={500}
                />
            </div>
        </Layout>
    )
}
