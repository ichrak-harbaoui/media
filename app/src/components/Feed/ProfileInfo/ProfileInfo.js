import React from 'react'
import moment from 'moment'

import classes from './ProfileInfo.module.css'
import { Link } from 'react-router-dom'

const ProfileInfo = props => {
    
    return (
        <div className={classes.cardSize}>
            <img src={"http://localhost:5001/image/"+props.profileUser.bgUrl} className={classes.bgImg} alt=""></img>
            <img src={"http://localhost:5001/image/"+props.profileUser.imgUrl} className={classes.profileImg} alt=""></img>
            <div className={classes.info}>
                <div className={classes.innerInfo}>
                    <div>
                        <div className={classes.nameText}>{props.profileUser.name}</div>
                        <div className={classes.dateText}>{moment(props.profileUser.date).fromNow()}</div>
                        <div className={classes.friends}>
                            {props.profileUser.friends.length} Friends
                        </div>
                    </div>

                    <div className={classes.edit}>
                    {/* <a href={"/infoByID/" + props.profileUser._id}>
                   <button className={classes.submitButton}>
                   <p>Edit Profile</p>
                   </button></a> */}

                    </div>

                  

                </div>
            </div>
        </div>
    )
}

export default ProfileInfo
