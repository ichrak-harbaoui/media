import { useForm } from 'react-hook-form';
import React, { useRef, useState } from 'react'
import classes from "./Register.module.css"

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
const UpdatePassword = props => {
    const { register, handleSubmit,watch, errors } = useForm();
    const { onSwitchState } = props;
    const nameInputBorder = errors.Password ? classes.errorInput : classes.input
    const mailInputBorder = errors.Password ? classes.errorInput : classes.input
    const password = useRef({});
    password.current = watch("Password", "");
console.log(errors.Password);
    return (
        <form className={classes.form} onSubmit={handleSubmit(props.onSubmitpass)}>
            <h1 className={classes.headerText}>Join Now</h1>
            <div className={classes.mediaIconsContainer}>
                <div>
                    <label htmlFor="file-input">
                        <div className={classes.plusContainer}><i className={["fas fa-plus", classes.mediaIcons].join(' ')} /></div>
                    </label>
                    <input  name="file"id="file-input" type='file' accept="image/*" onChange={(e) => { 
                        console.log(e.target.files);
                        props.setFile(e.target.files[0])}} />
                </div>
                {
                    props.file ?
                        <img className={classes.previewImage} src={URL.createObjectURL(props.file)} alt=""></img> :
                        <img className={classes.previewImage} src={"http://localhost:5001/image/" + props.userInfo?.data?.result?.imgUrl }alt=""></img>
                }
            </div>
            <input        
             className={nameInputBorder}
             type="password"
             placeholder="password"
             name="Password"
             ref={register({ required: true, minLength: 4, maxLength: 30 })}             
            />
             <input        
             className={nameInputBorder}
             type="password"
             placeholder=" confirm password"
             name="password_repeat"
             ref={register({
                validate: value =>  value === password.current || "The passwords do not match"
           })}            />
            <div className={classes.text} >{props.errorMessage}</div>
            <button
                className={classes.submitButton}
                type="submit"
               >
                Update     
            </button>
            {errors.password_repeat && <p>{errors.password_repeat.message}</p>}

            <div className={classes.text} onClick={onSwitchState}>cancel</div>
            <div ><p> </p></div>
          
        </form>
    )
}
export default UpdatePassword

