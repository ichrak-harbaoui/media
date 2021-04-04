import React from 'react'

import classes from './Comment.module.css'
//href={"/"+props.item.ownerID}
const Comment = props => {
    return (
        <div className={classes.commentContainer}>
            <div className={classes.imgtext}>
                <a href={"/" + props.comment.userID._id}> <img className={classes.commentUserPicture} alt="" src={"http://localhost:5001/image/"+props.comment.userID.imgUrl}></img>
                </a>
                <div className={classes.contentContainer}>
                    <div className={classes.commentContent}>
                        <div>
                            <a href={"/" + props.comment.userID._id}>
                                <span className={classes.commentOwnerText}>{props.comment.userID.name} </span>
                            </a>
                            {props.comment.content}
                        </div>

                        <div className={classes.bottomSection}>
                            {props.calculateTime(props.comment.date)}

                        </div>
        {/* <button
          onClick={() => deleteComment(postId, _id)}
          type='button'
          className='btn btn-danger'
        >
          <i className='fas fa-times' />
        </button> */}
                    </div>
                </div>
            </div>
          
        </div>
    )
}

export default Comment
