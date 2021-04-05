import axios from 'axios'
import { SEARCH_USER, GET_USER_INFO, FETCH_USER_INFO_BY_ID,SET_ERROR } from './actionTypes'
import Compressor from 'compressorjs';

// Searches user by name
export const searchUser = (name) => {
    return dispatch => {
        axios.get('http://localhost:5001/api/users/search/' + name).then(res => {
            dispatch(setSearchResult(res))
        })
    }
}

export const setSearchResult = res => {
    return {
        type: SEARCH_USER,
        payload: res
    };
};

// Gets user info by userID (Such as profile img, name)
export const getUserInfoById = (id) => {
    return dispatch => {
        axios.get('http://localhost:5001/api/users/infoByID/' + id).then(res => {
            dispatch(setUserInfoById(res))
        })
    }
}
export const setUserInfoById = res => {
    return {
        type: FETCH_USER_INFO_BY_ID,
        payload: res
    };
};

// Gets logged in user info (Such as profile img, name, friend requests...)
export const getInfo = () => {
    return dispatch => {
        axios.get('http://localhost:5001/api/users/info').then(res => {
            dispatch(setUserInfo(res));
        })
    }
}

export const setUserInfo = res => {
    return {
        type: GET_USER_INFO,
        payload: res
    };
};

// Sends friend request by userID
export const sendFriendRequest = (userID,input) => {
    return dispatch => {
        axios.post('http://localhost:5001/api/users/friendrequest/' + userID).then(res => {
        dispatch(searchUser(input))
        }).catch(err => console.log(err))
    }
}

// Accepts friend request by userID
export const acceptFriendRequest = userID => {
    return dispatch => {
        axios.post('http://localhost:5001/api/users/friend/' + userID).then(res => {
            dispatch(getInfo());
        }).catch(err => console.log(err))
    }
}

// Declines friend request by userID
export const deleteFriend = userID => {
    return dispatch => {
        axios.delete('http://localhost:5001/api/users/friend/:userID '+ userID).then(res => {
            dispatch(getInfo());    
        }).catch(err => console.log(err))
    }
}

export const removeFriendRequest = userID => {
    return dispatch => {
        axios.delete('http://localhost:5001/api/users/friendrequest/' + userID).then(res => {
            dispatch(getInfo());    
        }).catch(err => console.log(err))
    }
}



export const updateProfil = (data,file) => {
    const { Name , Email   } = data;

    return dispatch => {
        if (file) {
            new Compressor(file, {
                convertSize: 20,
                quality: 0.2,
                success(result) {
                    const formData = new FormData();
                    formData.append('file', result, result.name);
                    axios.post('http://localhost:5001/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(res => {
                        axios.post('http://localhost:5001/api/users/update', {
                            id:"606426c20074b8c281c125c3",
                            name: Name,
                            email: Email,
                            imgUrl: res.data.file.filename
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
        axios.post('http://localhost:5001/api/users/update' , {
            id:"606426c20074b8c281c125c3",
            name: Name,
            email: Email,
            
        }).then(res => {
            dispatch(getInfo());    
        }).catch(err => console.log(err))
    }}
    
}
export const setError = (error) => {
    return {
        type: SET_ERROR,
        error: error
    }
}