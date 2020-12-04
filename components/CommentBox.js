import React, {useState} from "react";
import {Form, Button} from 'react-bootstrap'

const CommentBox = () => {
    const [comments, setComments] = useState([
        {id: 1, author: "landiggity", body: "This is my first comment on this forum so don't be a dick"},
        {id: 2, author: "scarlett-jo", body: "That's a mighty fine comment you've got there my good looking fellow..."},
        {id: 3, author: "rosco", body: "What is the meaning of all of this 'React' mumbo-jumbo?"}
    ])
    const [showComments, setShowComments] = useState(false)

    const _addComment = (author, body) => {
        const comment = {
            id: comments.length + 1,
            author,
            body
        };
        setComments(comments.concat([comment])); // *new array references help React stay fast, so concat works better than push here.
    }

    const _handleClick = () => {
        setShowComments(!showComments);
    }

    const _getComments = () => {
        return comments.map((comment) => {
            return (
                <Comment
                    author={comment.author}
                    body={comment.body}
                    key={comment.id}/>
            );
        });
    }

    const _getCommentsTitle = (commentCount) => {
        if (commentCount === 0) {
            return 'No comments yet';
        } else if (commentCount === 1) {
            return "1 comment";
        } else {
            return `${commentCount} comments`;
        }
    }

    let commentNodes;
    let buttonText = 'Show Comments';

    if (showComments) {
        buttonText = 'Hide Comments';
        commentNodes = <div className="comment-list">{_getComments()}</div>;
    }

    return (
        <div className='p-4'>
            <div className='d-flex mb-1'>
                <p className='text-2xl font-bold mr-auto'>Discussion</p>
                <Button className='btn-subscribe' size='sm' variant="outline-secondary">Subscribe</Button>
            </div>
            <CommentForm addComment={_addComment}/>
            <button className='button-cmb' id="comment-reveal" onClick={_handleClick}>
                {buttonText}
            </button>
            <h5 className="comment-count pt-1">
                {_getCommentsTitle(comments.length)}
            </h5>
            {commentNodes}
        </div>
    );

}

const CommentForm = (props) => {
    const [author, setAuthor] = useState('')
    const [body, setBody] = useState('')

    const _handleSubmit = (event) => {
        event.preventDefault();   // prevents page from reloading on submit
        props.addComment(author.value, body.value);
    }

    return (
        <Form className="comment-form" onSubmit={_handleSubmit}>
            <div className="comment-form-fields">
                <Form.Control placeholder="Name" required onChange={(e) => setAuthor(e.target.value)}/><br/>
                <Form.Control as="textarea" rows={4}
                              placeholder="Add to the Discussion"
                              required onChange={(e)=> setBody(e.target.value)}/>
            </div>
            <div className="comment-form-actions">
                <button className='button-cmb mt-2 btn-post-comment'
                        type="submit">Post Comment</button>
            </div>
        </Form>
    );


} // end CommentForm component

const Comment = (props) => {

    const _deleteComment = () => {
        alert("-- DELETE Comment Functionality COMMING SOON...");
    }

    return (
        <div className="comment">
            <p className="comment-header">{props.author}</p>
            <p className="comment-body">- {props.body}</p>
            <div className="comment-footer">
                <a href="#" className="comment-footer-delete" onClick={_deleteComment}>Delete Comment</a>
            </div>
        </div>
    );

}


export default CommentBox