import React from 'react'
import NavbarContainer from '../../containers/NavbarContainer'
import FakeNewsContainer from '../../containers/FakeNewsContainer'
import classes from './HomeView.module.css'

//TODO: GROUPS
const FakeNews = () => {
    return (
        <>
            <div className={classes.screen}>
                <NavbarContainer />
                <div className={classes.renderItems}>
                    <div className={classes.wall}>
                        <FakeNewsContainer />
                  
                    </div>
                </div>
            </div>
        </>
    )
}

export default FakeNews
