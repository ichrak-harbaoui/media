import React from 'react'
import { useForm } from 'react-hook-form';

import classes from "./Login.module.css"

const SendCode = props => {
    const { register, handleSubmit, errors } = useForm();
    const { onSwitchState } = props;
    const mailInputBorder = errors.Email ? classes.errorInput : classes.input
    const passwordInputBorder = errors.Password ? classes.errorInput : classes.input

    return (
        <form className={classes.form} onSubmit={handleSubmit(props.onSubmit)}>
            <h2 className={classes.headerText}>Welcome to MediaSI</h2>
        
            <div className={classes.text} >{props.errorMessage}</div>
            <input
                className={mailInputBorder}
                type="text"
                placeholder="Email"
                name="Email"
                ref={register({ required: true, pattern: /^\S+@\S+$/i })}
            />
            <button
                className={classes.submitButton}
                type="submit">
                Log in
            </button>
            <a href="/sendCode" onClick={props.cancel}>Forgot password</a>

        </form>
    )
}

export default SendCode

