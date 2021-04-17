import React, { useState } from 'react'

import classes from './Feed.module.css'
import CreatePost from './CreatePost/CreatePost'
import PostItem from './PostItem/PostItem'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import { useForm } from 'react-hook-form';



const Feed = props => {
    const { register, handleSubmit, errors } = useForm();
    const [isModalOpen,setIsModalOpen] = useState(false)

    const nameInputBorder = errors.Name ? classes.errorInput : classes.input
    const mailInputBorder = errors.Email ? classes.errorInput : classes.input
    return (
        <div className={classes.wallContainer}>
              
            {
                props.id ?
                    props.profileUser.data ? <ProfileInfo profileUser={props?.profileUser?.data?.result

                    } 
                    userInfo={props?.userInfo}
                    />
                        : null :
                    <CreatePost
                        userInfo={props?.userInfo}
                        content={props?.content}
                        setContent={props?.setContent}

                        type={props.type}
                        setType={props.setType}
                        onCreatePost={props.onCreatePost}
                        setFile={props.setFile}
                        file={props.file}

                    />

            }
         <div>
            </div>
            {
                props.posts.data ?
                    props.posts.data.result.map(post => {
                        return (
                            <PostItem
                                key={post._id}
                                post={post}
                                onAddComment={props.onAddComment}
                                onDeletePost={props.onDeletePost}
                                onDeleteComment={props.onDeleteComment}
                                onLike={props.onLike}
                                onClickFeed={props.onClickFeed}
                                userInfo={props.userInfo}
                                onUpdatePost={props.onUpdatePost}
                                onUpdateComment={props.onUpdateComment}
                                setContent={props.setContent}
                                setComment={props?.setComment}
                                onFakePost={props?.onFakePost}



                            />
                        )
                    }) : null
            }
             
         <div>
            </div>
        </div>

    )
}

export default Feed
