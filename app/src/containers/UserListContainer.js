import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as authActions from '../store/actions/authActions'
import * as userActions from '../store/actions/userActions'

import Authh from '../components/Authh/Authh'
import Info from '../components/Info/Info'
import UserList from '../components/UserList/UserList';

const UserListContainer = props => {

    const [userID, setID] = useState(props.user.userInfo.data.result._id);

  
    useEffect(() => {
       props.allUsers();
    }, []);

    return (
        <>
            <UserList
                isAuthenticated={props.auth.isAuthenticated}
                errorMessage={props.auth.error}
                userList={props.user.userList}
                onSendFriendRequest={props.onSendFriendRequest}
                profileUser={props.user.profileUser}
                userInfo={props.user.userInfo}
              allUsers={props.allUsers}
              onRemoveFriend={props.onRemoveFriend}

                >
            </UserList>
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user

})

const mapDispatchToProps = dispatch => {
    return {
        onSendFriendRequest: (userID, input) => dispatch(userActions.sendFriendRequest(userID, input)),
        getProfileUserInfo: (id) => dispatch(userActions.getUserInfoById(id)),
        updateProfil: (data,file,userID) => dispatch(userActions.updateProfil(data,file,userID)),
        allUsers:()=>dispatch(userActions.allUsers()),
        onRemoveFriend: (userID) => dispatch(userActions.removeFriend(userID)),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListContainer)
