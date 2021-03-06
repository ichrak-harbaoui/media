import React, { useState, useEffect } from 'react'
import * as authActions from '../store/actions/authActions'
import * as userActions from '../store/actions/userActions'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar/Navbar'
import useSocket from 'use-socket.io-client';
import ChatContainer from './ChatContainer'
import * as chatActions from '../store/actions/chatActions'

const ENDPOINT = "http://localhost:5001";
const NavbarContainer = props => {

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
    const startNewChatHandler = (id, name, imgUrl) => {
        props.onNewChat(props.user.userInfo.data.result._id, id, name, imgUrl, props.chat.activeChats)
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
        socket.on('chat message' + props.user.userInfo.data.result._id, () => {
            props.onNewFriendRequest();
        })
        // eslint-disable-next-line 
    }, [])
    const onProfile = () => {
        props.getProfileUserInfo(props.id);
    }



    return (
        <>
            <Navbar
                userInfo={props.user.userInfo}
                onLogout={props.onLogout}
                showSettings={showSettings}
                toggleSettings={toggleSettings}
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
                profileUser={props.user.profileUser}
                getProfileUserInfo={props.getProfileUserInfo}
                onStartNewChat={startNewChatHandler}

            >
            </Navbar>
            <ChatContainer
                openChatOnMobile={openChatOnMobile}
            />
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user,
    chat: state.chat

})

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(authActions.authLogout()),
        onSearch: name => dispatch(userActions.searchUser(name)),
        onSendFriendRequest: (userID, input) => dispatch(userActions.sendFriendRequest(userID, input)),
        onAcceptFriendRequest: userID => dispatch(userActions.acceptFriendRequest(userID)),
        onRemoveFriendRequest: userID => dispatch(userActions.removeFriendRequest(userID)),
        onNewFriendRequest: () => dispatch(userActions.getInfo()),
        getProfileUserInfo: (id) => dispatch(userActions.getUserInfoById(id)),
        onNewChat: (userID, id, name, imgUrl, activeChats) => dispatch(chatActions.startNewChat(userID, id, name, imgUrl, activeChats)),


    }
};


export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer)

