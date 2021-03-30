import React from 'react'

import classes from './SettingsDropdown.module.css'
import ProfileInfo from '../../../Feed/ProfileInfo/ProfileInfo';

const SettingsDropdown = props => {
    return (
        <div className={classes.DropdownActive}>
             <div className={classes.title}>
                
            </div>
         
            <a href="/auth" onClick={props.onLogout}>Configure Profile</a>


        </div>
    )
}

export default SettingsDropdown
