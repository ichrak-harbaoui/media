import React from 'react'

import classes from './Feed.module.css'
import CreatePost from './CreatePost/CreatePost'
import PostItem from './PostItem/PostItem'
import ProfileInfo from './ProfileInfo/ProfileInfo'



const Feed = props => {

    return (
        <div className={classes.wallContainer}>
              
            {
                props.id ?
                    props.profileUser.data ? <ProfileInfo profileUser={props.profileUser.data.result

                    } 
                    userInfo={props.userInfo}
                    />
                        : null :
                    <CreatePost
                        userInfo={props.userInfo}
                        content={props.content}
                        setContent={props.setContent}
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
