import { useForm } from 'react-hook-form';
import React, { useState } from 'react'

import classes from "./Register.module.css"

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
const UpdateProfile = props => {
    const { register, handleSubmit, errors } = useForm();
    const { onSwitchState } = props;
    const nameInputBorder = errors.Name ? classes.errorInput : classes.input
    const mailInputBorder = errors.Email ? classes.errorInput : classes.input
    const passwordInputBorder = errors.Password ? classes.errorInput : classes.input
    const descriptionInputBorder = errors.Description ? classes.errorInput : classes.input

    const phoneInputBorder = errors.Phone ? classes.errorInput : classes.input
    const dateOfBirthInputBorder = errors.DateOfBirth ? classes.errorInput : classes.input

    return (
        <form className={classes.form} onSubmit={handleSubmit(props.onSubmit)}>
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
             type="text"
             placeholder="Name"
             name="Name"
             value={props.name}
             onChange={(e) => props.setName(e.target.value)}
             ref={register({ required: true, minLength: 4, maxLength: 30 })}             
            />
            <input
                className={mailInputBorder}
                type="text"
                placeholder="Email"
                name="Email"
                value={props.email}
                onChange={(e) => props.setEmail(e.target.value)}
                ref={register({ required: true, pattern: /^\S+@\S+$/i })}
            />
            <PhoneInput
             className={phoneInputBorder}
             name="Phone"
             placeholder="Phone Number"
             id="phone"
             value={props.phone}
             onChange={props.setPhone}
              />
              <input
              className={dateOfBirthInputBorder}
                name="DateOfBirth"
                id="dateOfBirth"
                type= "date"
                ref={register({ required: true, minLength: 4, maxLength: 30 })}
                value={props.birthday}
                onChange={(e) => props.setBirthday(e.target.value)}
              />
                <textarea
             
             className={descriptionInputBorder}
             placeholder="Description"
             name="Description"
             value={props.description}
             onChange={(e) => props.setDescription(e.target.value)}
            />
            
            <div className={classes.text} >{props.errorMessage}</div>
            <button
                className={classes.submitButton}
                type="submit">
                Update
            </button>
            <div className={classes.text} onClick={onSwitchState}>update your password</div>

            
            <div ><p> </p></div>
          
        </form>
    )
}

export default UpdateProfile

