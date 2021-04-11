import React, { useState } from 'react'

import classes from './Comment.module.css'
import { useForm } from 'react-hook-form'

//href={"/"+props.item.ownerID}
const Comment = props => {
    const [commentContent, setComment] = useState(props.comment.content);

    const { register, handleSubmit, errors } = useForm();
    const updateCommentHandler = () => {
        props.onUpdateComment(props.comment._id, document.getElementById(props.comment._id).value)
        document.getElementById(props.comment._id).value = ""
    }
    const deleteCommentHandler = () => {
        props.onDeleteComment(props.comment._id)
    }
    const [isModalOpen,setIsModalOpen] = useState(false)

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
                           <div className={classes.commentText}>{props.comment.content}</div> 
                        </div>

                        <div className={classes.bottomSection}>
                            {props.calculateTime(props.comment.date)}

                        </div>
                        <div>
                        {props.comment.userID._id === props.userID && (
                                  <div className="col-6">
             <button
                    onClick={() => {setIsModalOpen(!isModalOpen)}}
                    className={classes.bottomIconButton}
                    style={{right:'7%'}}

                    type="submit">
                    <i className="fas fa-cog"></i>
                </button>
               <button
               
               onClick={() => { deleteCommentHandler() }}
               className={classes.bottomIconButton}
               type="submit">
               <i className="fas fa-trash"></i>
           </button> 
          
           
           </div>
                  
                  )}
  
            </div>

            { isModalOpen &&
               <div >
               <form className={classes.form} onSubmit={handleSubmit(props.onSubmit)}>

               <textarea
               id={props.comment._id} 
                    className={classes.textArea}
                    placeholder="What's happening??"
                    rows="6"
                    value={commentContent}
                   onChange={(e) => setComment(e.target.value)}
                />
                   <button
                    onClick={() => { updateCommentHandler() }}
                       className={classes.submitButton}
                       type="submit">
                       UPDATE 
                   </button>
                   {/* <div className={classes.text} onClick={()=>setIsModalOpen(!isModalOpen)}>cancel</div> */}
               </form>
           
               </div>  
        }
          
                    </div>
                </div>
            </div>
          
        </div>
    )
}

export default Comment
