import React from 'react'
import NavbarContainer from '../../containers/NavbarContainer'
import FeedContainer from '../../containers/FeedContainer'

import classes from './Settings.module.css'

const SettingsView = ({ match }) => {
    return (
        <>
            <div className={classes.screen}>
                <NavbarContainer />
                <div className={classes.renderItems}>
                    <div className={classes.wall}>
                        <FeedContainer id={match.params.id}></FeedContainer>
                  
                    </div>
                </div>
            </div>
        </>
    )
}

export default SettingsView
