import React from 'react'
import NavbarContainer from '../../containers/NavbarContainer'

import classes from './ProfileView.module.css'
import InfoContainer from '../../containers/InfoContainer';

const InfoView= ({ match }) => {
    return (
        <>
            <div className={classes.screen}>
                <NavbarContainer />
                <div className={classes.renderItems}>
                    <div className={classes.wall}>
                    <InfoContainer />

                    </div>
                </div>
            </div>
        </>
    )
}

export default InfoView
