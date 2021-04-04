import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as authActions from '../store/actions/authActions'
import * as userActions from '../store/actions/userActions'

import Authh from '../components/Authh/Authh'
import Info from '../components/Info/Info'

const InfoContainer = props => {

    const [file, setFile ] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
  
    
    const onSubmit = (data) => {

        props.updateProfil(data) 
  

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
        updateProfil: (id,name,email) => dispatch(userActions.updateProfil(id,name,email)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoContainer)
