import React from 'react'
import { Redirect } from 'react-router'

import classes from './Authh.module.css'
import SendCode from './SendCode/SendCode';
import ConfirmCode from './ConfirmCode/ConfirmCode';


const ForgotPassword = props => {
    return (
        <>
            <div className={classes.flexContainer}>
                <div className={classes.centerContainer}>
                    <div className={classes.leftContainer}>
                        <div className={classes.authContainer}>
                            {props.switchState ?
                                <SendCode
                                    onSwitchState={props.onSwitchState}
                                    onSubmit={props.onSubmit}
                                    errorMessage={props.errorMessage}>
                                </SendCode> :
                                <ConfirmCode
                                    onSwitchState={props.onSwitchState}
                                    onSubmit={props.onSubmit}
                                    errorMessage={props.errorMessage}
                                    setFile={props.setFile}
                                    file={props.file}
                                    setPhone={props.setPhone}
                                    phone={props.phone}
                                    >
                                </ConfirmCode>
                                

                                 
                            }
                        </div>
                      
                    </div>
                     <div className={classes.rightContainer}>

                    </div> 
                </div>
            </div>
        </>

    )
}

export default ForgotPassword
