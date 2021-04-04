import React from 'react'
import NavbarContainer from '../../containers/NavbarContainer'

import classes from './ProfileView.module.css'
import DetailPostContainer from '../../containers/DetailPostContainer';

const DetailPostView = ({ match }) => {
    return (
        <>
            <div className={classes.screen}>
                <NavbarContainer />
                <div className={classes.renderItems}>
                    <div className={classes.wall}>
                        <DetailPostContainer id={match.params.id}></DetailPostContainer>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailPostView
