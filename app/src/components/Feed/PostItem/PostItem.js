import React from 'react'
import moment from 'moment'
import classes from './PostItem.module.css'
import Comment from './Comment/Comment'
import { useHistory } from 'react-router-dom'

const PostItem = props => {

    const userID = (props.userInfo?.data?.result?._id)
    const calculateTime = (date) => {
        return moment(date).fromNow();
    }

    const addCommentHandler = () => {
        props.onAddComment(props.post._id, document.getElementById(props.post._id).value)
        document.getElementById(props.post._id).value = ""
    }

    const deletePostHandler = () => {
        props.onDeletePost(props.post._id)
   
    }

    let history = useHistory();

    const _handleClickDetails = (id) => {
         console.log(id);
    
    }

    return (
        <div className={classes.postContainer}>
            <div className={classes.userInfo}>
                <a href={"/" + props.post.userID._id} alt="">  <img className={classes.userPicture} alt="" src={"http://localhost:5001/image/" + props.post.userID.imgUrl}></img>
                </a>
                <div className={classes.userTextContainer}>
                    <a href={"/" + props.post.userID._id} alt="">
                        <div className={classes.userName}>
                            {props.post.userID.name}
                        </div>
                    </a>
                    <div className={classes.postDate}>
                        {calculateTime(props.post.date)}
                    </div>
                </div>
            </div>
            <div>
            {props.post.userID._id === props.userInfo?.data?.result?._id ? (

            <button
                    onClick={() => { deletePostHandler() }}
                    className={classes.sendButton}
                    type="submit">
                    <i className="fas fa-trash"></i>
                </button>             ) : null}

            </div>
            <div  className={classes.contentContainer} >
            <a href={"/details/" + props.post._id} alt="">
                {props.post.content}
                </a>
                
            </div>
            {
                props.post.type === 1 ?
                    <div>
                        <img className={classes.postImg} alt="" src={"http://localhost:5001/image/" + props.post.mediaURL}></img>
                    </div> : null
            }
            <div className={classes.contentInfo}>
                <div>
                    <span style={{ fontWeight: "500" }}>{props.post.likes.length} Likes</span>
                </div>
                <div className={classes.contentCommentInfo}>
                    <div style={{ marginRight: "5px" }}>
                        <span>{props.post.comments.length} comments</span>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
            <div className={classes.buttonsContainer}>

                {
                    props.userInfo.data ?
                        <button
                            onClick={() => props.onLike(props.post._id)}
                            className={classes.submitButton}
                            type="submit">
                            {

                                props.post.likes.includes(props.userInfo.data.result._id) ?
                                    <div ><i style={{ color: "#B80C09" }} className="fas fa-heart"></i> Liked</div> :
                                    <div><i className="far fa-heart"></i> Like</div>
                            }
                        </button>
                        : null
                }
                <button
                    className={classes.submitButton}
                    type="submit">
                    <i className="far fa-comment-alt"></i> Comment
                </button>
                <button
                    className={classes.submitButton}
                    type="submit">
                    <i className="far fa-share-square"></i> Share
                </button>
            </div>
            <div className={classes.commentsContainer}>

                {
                    props.post.comments ?
                        props.post.comments.map((item, index) => {
                            return (
                                <Comment key={index} 
                                comment={item} 
                                onDeleteComment={props.onDeleteComment}
                                calculateTime={calculateTime}
                                userID={userID}
                                ></Comment>

                            )
                        })
                        : null
                }
            </div>

            <div className={classes.inputContainer}>
                <textarea id={props.post._id} className={classes.commentInput} placeholder="Add a comment..." rows="1"></textarea>
                <button
                    onClick={() => { addCommentHandler() }}
                    className={classes.sendButton}
                    type="submit">
                    <i className="fas fa-share"></i>
                </button>
            </div>
        </div>
    )
}

export default PostItem
