import React, { useState } from 'react'
import moment from 'moment'
import classes from './PostItem.module.css'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchMoreFeed } from 'store/actions/postActions'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { useForm } from 'react-hook-form'

const PostItem = props => {
    const { register, handleSubmit, errors } = useForm();
    const nameInputBorder = errors.Name ? classes.errorInput : classes.input
    const mailInputBorder = errors.Email ? classes.errorInput : classes.input
    const userID = (props.userInfo?.data?.result?._id)
    const calculateTime = (date) => {
        return moment(date).fromNow();
    }
    const [postContent, setPost] = useState(props.post.content);


    const updatePostHandler = () => {
        props.onUpdatePost(props.post._id, document.getElementById(props.post._id).value)
        document.getElementById(props.post._id).value = ""
    }

    const addCommentHandler = () => {
        props.onAddComment(props.post._id, document.getElementById(props.post._id).value)
        document.getElementById(props.post._id).value = ""
    }

    const deletePostHandler = () => {
        props.onDeletePost(props.post._id)
   
    }
    const fakePostHandler = () => {
        props.onFakePost(props.post._id)
   
    }


   
    let history = useHistory();

    const _handleClickDetails = (id) => {
         console.log(id);
    
    }
    const [isModalOpen,setIsModalOpen] = useState(false)
    return (
        <>
   
     
        <div className={classes.postContainer}>

        
            <div className={classes.userInfo} >
                <a href={"/" + props.post.userID._id} alt="" >  <img className={classes.userPicture} alt="" src={"http://localhost:5001/image/" + props.post.userID.imgUrl }></img>
                </a>
                <div className={classes.userTextContainer} >
                    <a href={"/" + props.post.userID._id} alt="">
                        <div className={classes.userName}>
                            {props.post.userID.name}
                        </div>
                    </a>
                    <div className={classes.postDate}>
                        {calculateTime(props.post.date)}
                    </div>
                </div>
                
            {props.post.userID._id === props.userInfo?.data?.result?._id && (
                <div className="col-6">
                <button
                    onClick={() => {setIsModalOpen(!isModalOpen)}}
                    className={classes.bottomIconButton}
                    style={{right:'7%'}}

                    type="submit">
                    <i className="fas fa-cog"></i>
                </button>
              <button
                onClick={() => { deletePostHandler() }}
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
               id={props.post._id} 
                    className={classes.textArea}
                    placeholder="What's happening??"
                    rows="6"
                    value={postContent}
                    onChange={(e) => setPost(e.target.value)}
                />
                  
                   <button
                    onClick={() => { updatePostHandler() }}
                       className={classes.submitButton}
                       type="submit">
                       UPDATE 
                   </button>
                   {/* <div className={classes.text} onClick={()=>setIsModalOpen(!isModalOpen)}>cancel</div> */}
               </form>
           
               </div>  
        }
          
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
                            //onClick={() => props.onLike(props.post._id)}
                            className={classes.submitButton}
                            type="submit">
                            {

                                props.post.likes.includes(props.userInfo.data.result._id) ?
                                    <div ><i style={{ color: "#B80C09" }} className="fa fa-smile-o" aria-hidden="true">Fake</i> </div> :
                                    <div><i className="fa fa-smile-o" aria-hidden="true"></i>Official</div>
                            }
                        </button>
                        : null
                }
           {
                    props.userInfo.data ?
                        <button
                            //onClick={() => props.onLike(props.post._id)}
                            className={classes.submitButton}
                            type="submit">
                            {

                                props.post.likes.includes(props.userInfo.data.result._id) ?
                                    <div ><i style={{ color: "#B80C09" }} className="fa fa-frown-o" aria-hidden="true">Fake</i> </div> :
                                    <div><i className="fa fa-frown-o" aria-hidden="true"></i>Fake</div>
                            }
                        </button>
                        : null
                }
            </div>
      

      
            
        </div>
        </>
    )
}

export default PostItem
