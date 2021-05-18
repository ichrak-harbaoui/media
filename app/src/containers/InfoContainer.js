import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as authActions from '../store/actions/authActions'
import * as userActions from '../store/actions/userActions'
import Info from '../components/Info/Info'

const InfoContainer = props => {
    const [switchState, setSwitchState] = useState(true);
    const handleSwitch = () => {
        setSwitchState(curr => !curr);
    }
    const [file, setFile ] = useState(props.user.userInfo.data.result.file);
    const [name, setName] = useState(props.user.userInfo.data.result.name);
    const [email, setEmail] = useState(props.user.userInfo.data.result.email);
    const [userID, setID] = useState(props.user.userInfo.data.result._id);
    const [phone, setPhone] = useState(props.user.userInfo.data.result.phone);
    const [birthday, setBirthday] = useState(props.user.userInfo.data.result.dateOfBirth);
    const [description, setDescription] = useState(props.user.userInfo.data.result.description);
    const onSubmit = (data) => {

        props.updateProfil(data,file,phone,description,userID) 

    }

    const onSubmitpass = (password) => {

        props.updatePassword(userID,password) 
        console.log(password);

    }
    useEffect(() => {
       props.allUsers();
    }, []);

    return (
        <>
            <Info
                onSwitchState={handleSwitch}
                isAuthenticated={props.auth.isAuthenticated}
                onSubmit={onSubmit}
                onSubmitpass={onSubmitpass}
                errorMessage={props.auth.error}
                setFile={setFile}
                setName={setName}
                setEmail={setEmail}
                profileUser={props.user.profileUser}
                userInfo={props.user.userInfo}
                file={file}
                name={name}
                email={email}
                setPhone={setPhone}
                phone={phone}
                setBirthday={setBirthday}
                birthday={birthday}
                setDescription={setDescription}
                description={description}
                switchState={switchState}
                updatePassword={props.updatePassword}
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
        updateProfil: (data,file,phone,description,userID) => dispatch(userActions.updateProfil(data,file,phone,description,userID)),
        allUsers:()=>dispatch(userActions.allUsers()),
        updatePassword: (userID, password) => dispatch(authActions.updatePassword(userID, password)),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoContainer)
