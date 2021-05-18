import ForgotPassword from 'components/ForgotPassword/ForgotPassword';
import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as authActions from '../store/actions/authActions'


const ForgotPasswordContainer = props => {

    const [switchState, setSwitchState] = useState(true);
    const [file, setFile] = useState('');
    const [phone, setPhone] = useState('');

    const handleSwitch = () => {
        setSwitchState(curr => !curr);
    }

    const onSubmit = (data) => {
        switchState ?
            props.onLogin(data) :
            props.onRegister(data,phone,file)
           

    }

    return (
        <>
            <ForgotPassword
                isAuthenticated={props.auth.isAuthenticated}
                onSwitchState={handleSwitch}
                onSubmit={onSubmit}
                errorMessage={props.auth.error}
                switchState={switchState}
                setFile={setFile}
                file={file}
                setPhone={setPhone}
                phone={phone}
                >
            </ForgotPassword>
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
})

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (data,phone,file) => dispatch(authActions.registerUser(data,phone,file)),
        onLogin: (email, password) => dispatch(authActions.loginUser(email, password)),
        updatePassword: (id, password) => dispatch(authActions.updatePassword(id, password)),


    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordContainer)
