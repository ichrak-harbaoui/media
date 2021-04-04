import { useForm } from 'react-hook-form';
import React, { useState } from 'react'

import classes from "./Register.module.css"

const Info = props => {
    const { register, handleSubmit, errors } = useForm();
    const { onSwitchState } = props;
    const nameInputBorder = errors.Name ? classes.errorInput : classes.input
    const mailInputBorder = errors.Email ? classes.errorInput : classes.input
    const passwordInputBorder = errors.Password ? classes.errorInput : classes.input
   
    return (
        <form className={classes.form} onSubmit={handleSubmit(props.onSubmit)}>
            <h1 className={classes.headerText}>Join Now</h1>
            <div className={classes.mediaIconsContainer}>
                <div>
                    <label htmlFor="file-input">
                        <div className={classes.plusContainer}><i className={["fas fa-plus", classes.mediaIcons].join(' ')} /></div>
                    </label>
                    <input id="file-input" type='file' accept="image/*" onChange={(e) => props.setFile(e.target.files[0])} />
                </div>
                {
                    props.file ?
                        <img className={classes.previewImage} src={URL.createObjectURL(props.file)} alt=""></img> :
                        <img className={classes.previewImage} src={"http://localhost:5001/image/"+props.userInfo?.data?.result?.imgUrl} alt=""></img>
                }
            </div>
          
            <input
                className={nameInputBorder}
                type="text"
                placeholder="Name"
                name="Name"
                // value={props.userInfo?.data?.result?.name}
                // onChange={(e) => props.name(e.target.value)}             
                    />
            <input
                className={mailInputBorder}
                type="text"
                placeholder="Email"
                name="Email"
                // value={props.userInfo?.data?.result?.email}
                // onChange={(e) => props.setEmail(e.target.value)}      
                ref={register({ required: true, pattern: /^\S+@\S+$/i })}
            />
            
            <div className={classes.text} >{props.errorMessage}</div>
            <button
                className={classes.submitButton}
                type="submit">
                Update
            </button>
            <div className={classes.text} onClick={onSwitchState}>cancel</div>
        </form>
    )
}

export default Info

