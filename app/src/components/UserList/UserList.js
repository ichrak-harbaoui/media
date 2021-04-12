import { useForm } from 'react-hook-form';
import React, { useState } from 'react'

import classes from "./Register.module.css"
import UserListItem from '../UserList/UserListItem/UserListItem';


const UserList = props => {
    return (
                    <div className={classes.wallContainer}>
                    <UserListItem
                    userInfo={props.userInfo}
                    allUsers={props.allUsers}
                    userList={props.userList}
                    onSendFriendRequest={props.onSendFriendRequest}
                    onRemoveFriend={props.onRemoveFriend}

                    />

                    </div>
    )
}


export default UserList

