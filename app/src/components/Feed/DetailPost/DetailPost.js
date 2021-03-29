import React, { useState, useEffect, useCallback } from 'react'
import moment from 'moment'
import PostItem from './../PostItem/PostItem'

import classes from './DetailPost.css'

const DetailPost = props => {

    useEffect(() => {
    props.ClickFeed(props.id);

    }, []);


    
    
    return (
        <div className={classes.cardSize}>
            <img src={"http://localhost:5001/image/4340a1e9b961a04b66504114db99ae57.jpg"} className={classes.bgImg} alt=""></img>
            <div className={classes.info}>
                <div className={classes.innerInfo}>
                    <div>
                        <div className={classes.nameText}>{props.detailPost.content}</div>
                    </div>
                    <PostItem
                                post={props.post}
                                onAddComment={props.onAddComment}
                                onLike={props.onLike}
                                userInfo={props.userInfo}
                            />
                </div>
            </div>
        </div>
    )
}

export default DetailPost 
