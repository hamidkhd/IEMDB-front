import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {addComment, postMovieCommentRate} from "../Services/Movie";
import LoadingSpinner from "../common/LoadingSpinner";

function CommentsBox(props) {
    const changeComments = (comment, i) => {
        let newComments = [...props.comments];
        newComments[i] = comment;
        props.setComments(newComments);
    }
    let commentItems = []
    for (let i=0; i<props.comments.length; i++)
        commentItems.push(CommentItem(props.comments[i], changeComments, i));
    return (
        <div className="comments-box">
            <div className="title"> دیدگاه ها</div>
            <div className="comments-list">
                <NewComment setComments={props.setComments} comments={props.comments} />
                {commentItems}
            </div>
        </div>
    );

}

function NewComment(props) {
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        e.preventDefault();
        setComment(e.target.value);
    }
    const {movieId} = useParams();
    const handleSubmit =  (e) => {
        e.preventDefault();
        setLoading(true);
        addComment(movieId, comment)
            .then(res => {
                let newComments = [...props.comments];
                newComments.push(res);
                props.setComments(newComments);
                setLoading(false);
            })
            .catch(error => {
                if (error.response)
                    console.log(error.response.data);
                else
                    console.log(error);
            })
    }
    return (
        <div className="comment">
            <div className="comment-text">
                <p> دیدگاه خود را اضافه کنید: </p>
                <hr className="hor-line" />
                {loading? (<LoadingSpinner />) : (
                    <div>
                        <form className="comment-form" action="/action_page.php" onSubmit={handleSubmit}>
                            <input type="text" className="com-txt" id="com-txt" name="text" onChange={handleChange}/>
                            <input type="submit" className="submit-button" value="ثبت"/>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

function CommentItem(comment, changeComment, index) {
    const callChangeComment = (newComment) => {
        changeComment(newComment, index);
    }
    return (
        <div className="comments">
            <p className="commenter-name"> {comment.username} </p>
            <hr className="hor-line" />
            <div className="comment-body">
                <div><p> {comment.text} </p></div>
                <div>
                    <CommentRate comment={comment} changeComment={callChangeComment}/>
                    <div className="comment-score">
                        <span>{comment.like}</span>
                        <span>{comment.dislike}</span>
                    </div>
                </div>
            </div>
        </div>

    );
}

function CommentRate(props) {
    const updateLike = (like) => {
        const userId = JSON.parse(localStorage.getItem("user")).email;
        postMovieCommentRate(props.comment.movieId, userId, props.comment.commentId, like)
            .then(res => {
                props.changeComment(res);
            })
            .catch(error => {
                if (error.response)
                    console.log(error.response.data);
                else
                    console.log(error);
            })
    }
    return (
        <div>
            <div onClick={() => updateLike("1")}>
            <span className="iconify like-icon" data-icon="eva:arrow-ios-upward-fill"
            ></span>
            </div>
            <div onClick={() => updateLike("-1")}>
            <span className="iconify dislike-icon" data-icon="eva:arrow-ios-upward-fill"
                  data-rotate="180deg"></span>
            </div>
        </div>
    );
}

export default CommentsBox;