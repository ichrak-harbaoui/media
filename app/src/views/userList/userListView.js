import React from 'react'
import NavbarContainer from '../../containers/NavbarContainer'

import classes from './ProfileView.module.css'
import InfoContainer from '../../containers/InfoContainer';
import UserListContainer from '../../containers/UserListContainer';

const userListView= ({ match }) => {
    return (
        <>
            <div className={classes.screen}>
                <NavbarContainer />
                <div className={classes.renderItems}>
                    <div className={classes.wall}>
                    <UserListContainer />

                    </div>
                </div>
            </div>
        </>
    )
}

export default userListView
