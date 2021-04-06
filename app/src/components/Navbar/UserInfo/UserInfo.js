import React from 'react'
import classes from './UserInfo.module.css'
import SettingsDropdown from './SettingsDropdown/SettingsDropdown'
import Dropdown from '../../UI/Dropdown/Dropdown'
import Card from '../../UI/Card/Card'
import IconButton from '../../UI/Buttons/IconButton/IconButton'
import {useWindowSize} from '@react-hook/window-size'

const ProfileSection = props => {

    const { showSettings, toggleSettings, showFriends, toggleFriends, showNotifications, toggleNotifications } = props;
    const activeNotifications = showNotifications ? classes.active : null;
    const activeFriends = showFriends ? classes.active : null;
    const activeSettings = showSettings ? classes.active : null;
    const size = useWindowSize();
    const userID = (props.userInfo.data.result._id)

    return (
        <>
            {
                showFriends ?
                    <div className={classes.dropdownPosition}>
                        <Dropdown title="Friend Requests">
                            {
                                props.userInfo.data ?
                                    props.userInfo.data.result.friendRequests.length > 0 ?
                                        props.userInfo.data.result.friendRequests.map(user => {
                                            return (
                                                <Card
                                                    key = {user._id}
                                                    id={user._id}
                                                    image={user.imgUrl}
                                                    text={user.name}
                                                    subtext="0 mutual friends"
                                                >
                                                    <IconButton
                                                        iconType="fas fa-thumbs-up"
                                                        onClick={() => { props.onAcceptFriendRequest(user._id) }}
                                                    />
                                                    <IconButton
                                                        iconType="fas fa-thumbs-down"
                                                        onClick={() => { props.onRemoveFriendRequest(user._id) }}
                                                    />
                                                </Card>

                                            )
                                        }) :
                                        <div className={classes.text}>No new requests</div> : null
                            }
                        </Dropdown>
                    </div> : null
            }
          
            {
                showSettings ?
                    <SettingsDropdown
                        onLogout={props.onLogout} 
                        userID={userID}/> :
                    null
            }
            <div className={classes.container}>
            {
                size[0] > 650 ? 
              
                <div onClick={toggleFriends} className={classes.RequestIcon}>
                    <i className={["fas fa-user-friends", activeFriends].join(' ')}></i>
                    <div className={classes.iconContainer}>
                        <p>{props.userInfo?.data?.result?.friendRequests?.length}</p>
                    </div>
                </div>  : <div> </div>
            }
                
                {
                    props.userInfo?.data ?
                        <div><a href={"/" + props.userInfo?.data?.result?._id} alt=""><img className={classes.userImg} src={"http://localhost:5001/image/" + props.userInfo?.data?.result?.imgUrl} alt=""></img></a></div> : null
                }

                {
                    props.userInfo?.data ?
                        <a href={"/" + props.userInfo?.data?.result?._id} alt="" className={classes.userName}>{props.userInfo?.data?.result?.name}</a> : null
                }
                <div onClick={toggleSettings} className={classes.arrowIcon}>
                    <i className={["fas fa-caret-down", activeSettings].join(' ')}></i>

                </div>
            </div>
        </>
    )
}

export default ProfileSection
