import React, { useState } from 'react'
import Cardd from '../../UI/Cardd/Cardd';
import IconButton from '../../UI/Buttons/IconButton/IconButton';
import moment from 'moment'

import classes from './PostItem.module.css'

const UserListItem = props => {

    return (
        <>
        <p>Friend Suggestions</p>
   
     <div className = {classes.container}>
     {
                                props.userList.data ?
                                    props?.userList?.data?.map(user => {
                                        return (
                                            <div className = {classes.container}>

                                            <Cardd
                                                id={user._id}
                                                key={user._id}
                                                image={user.imgUrl}
                                                text={user.name}
                                                subtext={moment(user.date).fromNow()}
                                                subtexte={user.friends.length +" Friend "}


                                            >
                                               {
                                                    (user.friendRequests.filter(e => e === props.userInfo?.data?.result?._id).length === 0) &&
                                                    (props.userInfo?.data?.result?.friendRequests.filter(e => e._id === user._id).length === 0) &&

                                                        (props.userInfo?.data?.result?.friends.filter(e => e._id === user._id).length === 0) &&
                                                        (props.userInfo?.data?.result?._id !== user._id) ?
                                                        <div onClick={() => { props.onSendFriendRequest(user._id, props.searchInput)  }

                                                        }>
                                                            <IconButton iconType="fas fa-user-plus"/>
                                                        </div> : <div></div>
                                                }



                                                {
                                                   (user.friends.filter(e => e !== props.userInfo?.data?.result?._id).length === 0) &&
                                                   (props.userInfo?.data?.result?.friends.filter(e => e._id === user._id).length !== 0) &&

                                                   (props.userInfo?.data?.result?._id !== user._id) ?
                                                   <div onClick={() => { props.onRemoveFriend(user._id) }
                                                }>
                                                   
                                                            <IconButton iconType="fas fa-user-minus"/>
                                                        </div> : <div></div>
                                                }

{
                                                   (user.friendRequests.filter(e => e !== props.userInfo?.data?.result?._id).length === 0) &&
                                                   (props.userInfo?.data?.result?.friendRequests.filter(e => e._id === user._id).length !== 0) &&

                                                   (props.userInfo?.data?.result?._id !== user._id) ?
                                                   <div >
                                                
                                                   
                                                   <IconButton
                                                        iconType="fas fa-thumbs-up"
                                                        onClick={() => { props.onAcceptFriendRequest(user._id) }}
                                                    />
                                                    <IconButton
                                                        iconType="fas fa-thumbs-down"
                                                        onClick={() => { props.onRemoveFriendRequest(user._id) }}
                                                    />                                                        </div> : <div></div>
                                                }
    
                                            </Cardd>
                                            </div>
                                        )
                                    })
                                    : null
                            }


     </div>
       
        </>
    )
}

export default UserListItem
