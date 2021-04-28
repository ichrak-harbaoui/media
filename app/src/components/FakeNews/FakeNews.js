import React, { useState } from 'react'

import classes from './Feed.module.css'
import PostItem from './PostItem/PostItem'
import { useForm } from 'react-hook-form';



const FakeNews = props => {
    const { register, handleSubmit, errors } = useForm();
    const [isModalOpen,setIsModalOpen] = useState(false)


    const nameInputBorder = errors.Name ? classes.errorInput : classes.input
    const mailInputBorder = errors.Email ? classes.errorInput : classes.input
    return (
        <div className={classes.wallContainer}>
   
         <div>
            </div>
    

            {
                props.posts.data ?
                    props.posts.data.result.map(post => {
                        return (
                            <PostItem
                            key={post._id}
                            post={post}
                            onDeletePost={props.onDeletePost}
                            onClickFeed={props.onClickFeed}
                            userInfo={props.userInfo}
                            onUpdatePost={props.onUpdatePost}
                            setContent={props.setContent}
                            setComment={props?.setComment}
                            onFakePost={props?.onFakePost}
                            onFake={props.onFake}
                            onNoFake={props.onNoFake}
                            />
                        )
                    }) : null
            }
             
         <div>
            </div>
        </div>

    )
}

export default FakeNews
