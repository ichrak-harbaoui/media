import React from 'react'
import moment from 'moment'

import classes from './ProfileInfo.module.css'
import { Link } from 'react-router-dom'
import CreatePost from '../CreatePost/CreatePost';

const ProfileInfo = props => {

    return (
        <>
        
        <div className={classes.cardSize}>
            <img src={"http://localhost:5001/image/"+props.profileUser.bgUrl} className={classes.bgImg} alt=""></img>
            <img src={"http://localhost:5001/image/"+props.profileUser.imgUrl} className={classes.profileImg} alt=""></img>
            <div className={classes.info}>
                <div className={classes.innerInfo}>

                <div>
                <div className={classes.nameText}>{props.profileUser.name}</div>

                <div className={classes.dateText}>
                <i className="fas fa-phone-alt"></i>{props.profileUser.phone}</div>
                <div className={classes.dateText}> <i className="fas fa-birthday-cake"></i>{props.profileUser.dateOfBirth}</div>
                
                </div>
                    <div>
                        <div className={classes.dateText}> member since : {moment(props.profileUser.date).fromNow()}</div>
                        <div className={classes.friends}>
                            {props.profileUser.friends.length} Friends
                        </div>
                    </div>
               
                </div>
            </div>
        </div>
        {props.profileUser._id === props.userInfo?.data?.result?._id ? (

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
                    ) : null}

</>
    )
}

export default ProfileInfo
