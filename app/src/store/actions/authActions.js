import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import { getInfo } from './userActions'
import { SET_CURRENT_USER, LOG_OUT, SET_ERROR } from './actionTypes'
import Compressor from 'compressorjs';

// Register new user
export const registerUser = (data,phone, file) => {
    const { Name, Email ,DateOfBirth, Password } = data;
console.log({data})
    return dispatch => {
        if (file) {
            new Compressor(file, {
                convertSize: 20,
                quality: 0.2,
                success(result) {
                    const formData = new FormData();
                    // The third parameter is required for server
                    formData.append('file', result, result.name);
                    // Send the compressed image file to server with XMLHttpRequest.
                    axios.post('http://localhost:5001/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(res => {
                        axios.post('http://localhost:5001/api/auth/register', {
                            name: Name,
                            email: Email,
                            phone: phone,
                            dateOfBirth: DateOfBirth,
                            password: Password,
                            imgUrl: res.data.file.filename
                        })
                            .then(res => {
                                const data = {
                                    Email: Email,
                                    Password: Password
                                }
                                dispatch(loginUser(data))
                            })
                            .catch(error => dispatch(setError(error.response.data.error)))
                    })
                },
                error(err) {
                    console.log(err.message);
                },
            });
        }
        else {
            axios.post('http://localhost:5001/api/auth/register', {
                name: Name,
                email: Email,
                phone: phone,
                dateOfBirth: DateOfBirth,
                password: Password
            })
                .then(res => {
                    const data = {
                        Email: Email,
                        Password: Password
                    }
                    dispatch(loginUser(data))
                })
                .catch(error => dispatch(setError(error.response.data.error)))
        }
    }
}

// Login user
export const loginUser = (data) => {
    const { Email, Password } = data;
    return dispatch => {
        axios.post('http://localhost:5001/api/auth/login', {
            email: Email,
            password: Password
        })
            .then(res => {
                const { token } = res.data
                localStorage.setItem('jwtToken', token)
                setAuthToken(token)
                const decoded = jwt_decode(token)
                dispatch(setCurrentUser(decoded))
                dispatch(getInfo());

            })
            .catch(error => dispatch(setError(error.response.data.error)))
    }
}


export const sendCode = (data) => {
    const { Email } = data;
    return dispatch => {
        axios.post('http://localhost:5001/api/auth/sendCode', {
            email: Email,
        })
            
            .catch(error => dispatch(setError(error.response.data.error)))
    }
}

export const setError = (error) => {
    return {
        type: SET_ERROR,
        error: error
    }
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// Checks that user already signed in
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            dispatch(authLogout());
        } else {
            const decoded = jwt_decode(token)
            dispatch(setCurrentUser(decoded))
            setAuthToken(token)
            dispatch(getInfo())
        }
    };
};

export const updatePassword = (userID,password) => {
    const { Password } = password;

    return dispatch => {
        axios.post('http://localhost:5001/api/auth/updatePassword/' + userID , {
            password : Password
        }).then(res => {

            dispatch(getInfo())
        })
    }
}

export const logout = () => {
    return {
        type: LOG_OUT,
        error:""
    };
}

// Logs out the user
export const authLogout = () => {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        dispatch(logout());
    }
}


