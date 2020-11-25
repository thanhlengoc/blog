import React, {useState} from 'react';
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {okaidia} from "react-syntax-highlighter/dist/cjs/styles/prism";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {FaRegCopy} from 'react-icons/fa';
import {ImClipboard} from 'react-icons/im';
import {Button} from "react-bootstrap";

const CodeBlock = ({language, value}) => {
    const [isCopied, setIsCopied] = useState(false)

    return (
        <div className="parentSyntax">
            <CopyToClipboard className="copyButton"
                             onCopy={()=> setIsCopied(true)}
                             text={value}>
                <Button variant='dark'>
                    { isCopied ? <ImClipboard/> : <FaRegCopy/> }
                </Button>
            </CopyToClipboard>
            <SyntaxHighlighter style={okaidia} language={language}>{value}</SyntaxHighlighter>
        </div>
    )
};

export default CodeBlock