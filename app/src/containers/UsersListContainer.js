import React, { useState, useEffect, useCallback } from 'react'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import { connect } from 'react-redux'
import * as postActions from '../store/actions/postActions'
import * as userActions from '../store/actions/userActions'
import Feed from '../components/Feed/Feed'
import useSocket from 'use-socket.io-client';
import Comment from '../components/Feed/PostItem/Comment/Comment';
const ENDPOINT = "http://localhost:5001";

const UsersListContainer = props => {


    
        const [showSettings, setShowSettings] = useState(false);
        const [showFriends, setShowFriends] = useState(false);
        const [showNotifications, setShowNotifications] = useState(false);
        const [searchInput, setSearchInput] = useState("")
        const [openChatOnMobile, setChatOpenOnMobile] = useState(false)
    
        const toggleSettings = () => {
            setShowSettings(curr => !curr);
            setShowFriends(false);
            setShowNotifications(false);
            setSearchInput("");
        }
    
        const toggleFriends = () => {
            setShowFriends(curr => !curr);
            setShowSettings(false);
            setShowNotifications(false);
            setSearchInput("");
        }
    
        const toggleNotifications = () => {
            setShowNotifications(curr => !curr);
            setShowFriends(false);
            setShowSettings(false);
            setSearchInput("");
        }
    
        const toggleSearch = () => {
            setShowFriends(false);
            setShowNotifications(false);
            setSearchInput("");
        }
    
    
        const searchInputHandler = (e) => {
            toggleSearch();
            setSearchInput(e.target.value);
            if (e.target.value.length > 0) {
                props.onSearch(e.target.value);
            }
        }
    
    
        const [socket] = useSocket(ENDPOINT);
    
        useEffect(() => {
            socket.on('friendreq' + props.user.userInfo.data.result._id, () => {
                props.onNewFriendRequest();
            })
            // eslint-disable-next-line 
        }, [])
        const onProfile = () => {
            props.getProfileUserInfo(props.id);
        }
  

  
    return (
        <>
            <Feed
                profileUser={props.user.profileUser}
                userInfo={props.user.userInfo}
                showFriends={showFriends}
                toggleFriends={toggleFriends}
                showNotifications={showNotifications}
                toggleNotifications={toggleNotifications}
                searchInput={searchInput}
                toggleSearch={toggleSearch}
                searchResult={props.user.searchResult}
                searchInputHandler={searchInputHandler}
                onSendFriendRequest={props.onSendFriendRequest}
                onAcceptFriendRequest={props.onAcceptFriendRequest}
                onRemoveFriendRequest={props.onRemoveFriendRequest}
                setOpenChatOnMobile={setChatOpenOnMobile}
                getProfileUserInfo={props.getProfileUserInfo}

            />
        </>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    auth: state.auth,


})

const mapDispatchToProps = dispatch => {
    return {
    
        onSearch: name => dispatch(userActions.searchUser(name)),
        onSendFriendRequest: (userID, input) => dispatch(userActions.sendFriendRequest(userID, input)),
        onAcceptFriendRequest: userID => dispatch(userActions.acceptFriendRequest(userID)),
        onRemoveFriendRequest: userID => dispatch(userActions.removeFriendRequest(userID)),
        onNewFriendRequest: () => dispatch(userActions.getInfo()),
        getProfileUserInfo: (id) => dispatch(userActions.getUserInfoById(id)),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersListContainer)
