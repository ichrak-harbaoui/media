import React, { useState, useEffect, useCallback } from 'react'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import { connect } from 'react-redux'
import * as postActions from '../store/actions/postActions'
import * as userActions from '../store/actions/userActions'
import Feed from '../components/Feed/Feed'
import DetailPost from '../components/DetailPost/DetailPost';

const DetailPostContainer = props => {

 
  

    const [content, setContent] = useState("");
    const [type, setType] = useState(1);
    const [file, setFile] = useState('');



    return (
        <>
            <DetailPost
                content={content}
                setContent={setContent}
                type={type}
                setType={setType}
                posts={props.post.feed}
                post={props.getPostById}
                onAddComment={props.onAddComment}
                onLike={props.onLike}
                userInfo={props.user.userInfo}
                setFile={setFile}
                file={file}
                isAuthenticated={props.auth.isAuthenticated}
                onDeletePost={props.onDeletePost}
                postId={props.post.id}

            />
        </>
    )
}

const mapStateToProps = state => ({
    post: state.post,
    user: state.user,
    auth: state.auth,


})

const mapDispatchToProps = dispatch => {
    return {
        getPostById: (id) => dispatch(postActions.getPostById(id)),
        onDeletePost:(postID) => dispatch(postActions.deletePost(postID)),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPostContainer)

