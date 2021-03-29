import React from 'react'
import NavbarContainer from '../../containers/NavbarContainer'
import DetailPost from '../../components/Feed/DetailPost/DetailPost'

import classes from './ProfileView.module.css'

const DetailPostView = ({ match }) => {
    return (
        <>
            <div className={classes.screen}>
                <NavbarContainer />
                <div className={classes.renderItems}>
                    <div className={classes.wall}>
                        <DetailPost id={match.params.id}></DetailPost>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailPostView
