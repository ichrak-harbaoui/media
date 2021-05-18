import React from 'react'
import { Redirect } from 'react-router'
import classes from "./Register.module.css"

import UpdatePassword from './UpdatePassword/UpdatePassword';
import UpdateProfile from './UpdateProfile/UpdateProfile';

const Info = props => {
    return (
        <>
            <div className={classes.flexContainer}>
                <div className={classes.centerContainer}>
                    <div className={classes.leftContainer}>
                        <div className={classes.authContainer}>
                            {props.switchState ?
                                <UpdateProfile
                                onSwitchState={props.onSwitchState}
                                isAuthenticated={props.isAuthenticated}
                                onSubmit={props.onSubmit}
                                errorMessage={props.error}
                                setFile={props.setFile}
                                setName={props.setName}
                                setEmail={props.setEmail}
                                profileUser={props.profileUser}
                                userInfo={props.userInfo}
                                file={props.file}
                                name={props.name}
                                email={props.email}
                                setPhone={props.setPhone}
                                phone={props.phone}
                                setBirthday={props.setBirthday}
                                birthday={props.birthday}
                                setDescription={props.setDescription}
                                description={props.description}
                                switchState={props.switchState}
                                updatePassword={props.updatePassword}>
                                </UpdateProfile> :
                                <UpdatePassword
                                onSwitchState={props.onSwitchState}
                                isAuthenticated={props.isAuthenticated}
                                onSubmitpass={props.onSubmitpass}
                                errorMessage={props.error}
                                setFile={props.setFile}
                                setName={props.setName}
                                setEmail={props.setEmail}
                                profileUser={props.profileUser}
                                userInfo={props.userInfo}
                                file={props.file}
                                name={props.name}
                                email={props.email}
                                setPhone={props.setPhone}
                                phone={props.phone}
                                setBirthday={props.setBirthday}
                                birthDay={props.birthday}
                                setDescription={props.setDescription}
                                description={props.description}
                                switchState={props.switchState}
                                updatePassword={props.updatePassword}
                                    >
                                </UpdatePassword>
                                

                                 
                            }
                        </div>
                      
                    </div>
                    
                </div>
            </div>
        </>

    )
}

export default Info
