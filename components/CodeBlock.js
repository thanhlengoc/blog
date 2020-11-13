import React from 'react';
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {okaidia} from "react-syntax-highlighter/dist/cjs/styles/prism";

const CodeBlock = ({ language, value }) => {
    return <SyntaxHighlighter style={okaidia} language={language}>{value}</SyntaxHighlighter>;
};

export default CodeBlock