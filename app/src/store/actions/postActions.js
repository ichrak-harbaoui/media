import axios from 'axios'
import { DELETE_FEED_SUCCESS,FETCH_MORE_FEED, SET_SINGLE_POST, SET_UPDATED_POST,SET_POST_BY_ID } from './actionTypes'
import Compressor from 'compressorjs';

// Creates new post 
export const createPost = (content, type, file) => {
    return dispatch => {
        // Type 1 means post has a image with it
        // Decrease its size and uploads it to the server as multipart form data
        if (type === 1) {
            new Compressor(file, {
                convertSize: 500000, 
                quality: 0.6,
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
                        axios.post('http://localhost:5001/api/posts', {
                            content: content,
                            type: type,
                            mediaURL: res.data.file.filename
                        },
                        ).then(res => {
                            dispatch(getSinglePost(res.data.postID))
                        }).catch(err => { console.log(err) })
                    }).catch(err => {
                        console.log(err)
                    })
                },
                error(err) {
                    console.log(err.message);
                },
            });
        }
        // Makes post request to the server
        else if (type === 0) {
            axios.post('http://localhost:5001/api/posts', {
                content: content,
                type: type,
            },
            ).then(res => {
                dispatch(getSinglePost(res.data.postID))
            }).catch(err => { console.log(err) })
        }


    }




}




export const fakepost = (postID) => {
    return dispatch => {
        axios.post('http://localhost:5001/api/posts/fakePost/' + postID, {
            
        }).then(res => {
            dispatch(setDeleteFeed())
            dispatch(fetchMoreFeed())        
            }).catch(err => {
            console.log(err)
        })
    }
}


// Fetches feed for desired page number
export const fetchMoreFeed = (page) => {
    return dispatch => {
        axios.get('http://localhost:5001/api/posts/' + page, {
        })
            .then(res => {
                //console.log(res)
                dispatch(setFetchMoreFeed(res))
            })
            .catch(err => { console.log(err) })
    }
}

// Fetches feed for desired user 
export const fetchMoreProfileFeed = (id, page) => {
    return dispatch => {
        axios.get('http://localhost:5001/api/posts/profile/' + id + "/" + page, {
        })
            .then(res => {
                //console.log(res)
                dispatch(setFetchMoreFeed(res))
            })
            .catch(err => { console.log(err) })
    }
}


export const setFetchMoreFeed = (data) => {
    return {
        type: FETCH_MORE_FEED,
        payload: data
    }
}

export const deletePost = (postID) => {
    return dispatch => {
        axios.get('http://localhost:5001/api/posts/deletePost/' + postID).then(res => {
            dispatch(setDeleteFeed())
            dispatch(fetchMoreFeed())
        }).catch(err => console.log(err))
    }
}

export const setDeleteFeed = () => {
    return {
        type: DELETE_FEED_SUCCESS,
        payload: []
    }
}
export const deleteComment = (commentID) => {
    return dispatch => {
        axios.get('http://localhost:5001/api/comments/deleteComment/' + commentID).then(res => {
            dispatch(setDeleteFeed())
            dispatch(fetchMoreFeed())        }).catch(err => console.log(err))
    }
}



// Fetches a post by post id ( Used for updates )
export const getSinglePost = (postID) => { 
    return dispatch => {
        axios.get('http://localhost:5001/api/posts/post/' + postID, {

        }).then(res => {
            dispatch(setSinglePost(res))
        })
    }
}

export const setSinglePost = (post) => { // SENKRON > REDUCER
    return {
        type: SET_SINGLE_POST,
        payload: post
    }
}

// Adds a new comment to a post by postID and content
export const addComment = (postID, content) => {
    return dispatch => {
        axios.post('http://localhost:5001/api/comments/create/' + postID, {
            "content": content
        }).then(res => {
            dispatch(updatePost(postID))
        }).catch(err => {
            console.log(err)
        })
    }
}
export const updateComment = (commentID, content) => {
    return dispatch => {
        axios.post('http://localhost:5001/api/comments/updateComment/' + commentID, {
            "content": content
        }).then(res => {
            dispatch(setDeleteFeed())
            dispatch(fetchMoreFeed())        
            }).catch(err => {
            console.log(err)
        })
    }
}
// Like (and Unlike) a post by PostID
export const like = (postID) => {
    return dispatch => {
        axios.post('http://localhost:5001/api/posts/like/' + postID, {
        }).then(res => {
            dispatch(updatePost(postID))
        }).catch(err => {
            console.log(err)
        })
    }
}

export const updatePost = (postID) => {
    return dispatch => {
        axios.get('http://localhost:5001/api/posts/post/' + postID, {
        }).then(res => {
            dispatch(setUpdatedPost(res))
        })
    }
}

export const updatePoste = (postID, content) => {
    return dispatch => {
        axios.post('http://localhost:5001/api/posts/updatePost/' + postID, {
            "content": content
        }).then(res => {
            dispatch(updatePost(postID))
        }).catch(err => {
            console.log(err)
        })
    }
}
export const setUpdatedPost = (data) => {
    return {
        type: SET_UPDATED_POST,
        payload: data
    }
}

export const getPostById = (id) => {
    return dispatch => {
        axios.get('http://localhost:5001/api/posts/post/' + id).then(res => {
            dispatch(setPostById(res))
        })
    }
}

export const setPostById = res => {
    return {
        type: SET_POST_BY_ID,
        payload: res
    };
};