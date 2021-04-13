import React from 'react'
import { useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import classes from "./Register.module.css"

const Register = props => {
    const { register, handleSubmit, errors } = useForm();
    const { onSwitchState } = props;
    const nameInputBorder = errors.Name ? classes.errorInput : classes.input
    const phoneInputBorder = errors.Phone ? classes.errorInput : classes.input
    const dateOfBirthInputBorder = errors.DateOfBirth ? classes.errorInput : classes.input

    
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
                        <img className={classes.previewImage} src="https://www.ctvalleybrewing.com/wp-content/uploads/2017/04/avatar-placeholder.png" alt=""></img>
                }
            </div>
            <input
                className={nameInputBorder}
                type="text"
                placeholder="Name"
                name="Name"
                ref={register({ required: true, minLength: 4, maxLength: 30 })}
            />
            <input
                className={mailInputBorder}
                type="text"
                placeholder="Email"
                name="Email"
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

              />
            <input
                className={passwordInputBorder}
                type="password"
                placeholder="Password"
                name="Password"
                ref={register({ required: true })}
            />

            <div className={classes.text} >{props.errorMessage}</div>
            <button
                className={classes.submitButton}
                type="submit">
                Register
            </button>
            <div className={classes.text} onClick={onSwitchState}>Already a member?</div>
        </form>
    )
}

export default Register

