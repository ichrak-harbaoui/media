import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as authActions from '../store/actions/authActions'
import * as userActions from '../store/actions/userActions'

import Authh from '../components/Authh/Authh'
import Info from '../components/Info/Info'

const InfoContainer = props => {

    const [file, setFile ] = useState(props.user.userInfo.data.result.file);
    const [name, setName] = useState(props.user.userInfo.data.result.name);
    const [email, setEmail] = useState(props.user.userInfo.data.result.email);
    const [userID, setID] = useState(props.user.userInfo.data.result._id);

    const onSubmit = (data) => {

        props.updateProfil(data,file,userID) 

    }

    return (
        <>
            <Info
                isAuthenticated={props.auth.isAuthenticated}
                onSubmit={onSubmit}
                errorMessage={props.auth.error}
                setFile={setFile}
                setName={setName}
                setEmail={setEmail}
                profileUser={props.user.profileUser}
                userInfo={props.user.userInfo}
                file={file}
                name={name}
                email={email}

                >
            </Info>
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user

})

const mapDispatchToProps = dispatch => {
    return {
        getProfileUserInfo: (id) => dispatch(userActions.getUserInfoById(id)),
        updateProfil: (data,file,userID) => dispatch(userActions.updateProfil(data,file,userID)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoContainer)
