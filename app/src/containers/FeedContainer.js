import React, { useState, useEffect, useCallback } from 'react'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import { connect } from 'react-redux'
import * as postActions from '../store/actions/postActions'
import * as userActions from '../store/actions/userActions'
import Feed from '../components/Feed/Feed'
import useSocket from 'use-socket.io-client';
const ENDPOINT = "http://localhost:5001";

const FeedContainer = props => {

    const onProfile = () => {
        props.onFetchProfileFeed(props.id, pageNumber);
        props.getProfileUserInfo(props.id);
    }

    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        props.id ? onProfile() : props.onFetchFeed(pageNumber);
    }, [pageNumber]);

    const [content, setContent] = useState("");
    const [type, setType] = useState(1);
    const [file, setFile] = useState('');

    const createPostHandler = () => {
        let type;
        type = file !== '' ? 1 : 0;
        props.onCreatePost(content, type, file);
        setContent("");
        setFile('');
    }
  

    const handleOnDocumentBottom = useCallback(() => {
        setPageNumber(curr => curr + 1)

    }, [])
    useBottomScrollListener(handleOnDocumentBottom, 400)

  
    return (
        <>
            <Feed
                profileUser={props.user.profileUser}
                id={props.id}
                content={content}
                setContent={setContent}
                type={type}
                setType={setType}
                onCreatePost={createPostHandler}
                onFetchFeed={props.onFetchFeed}
                posts={props.post.feed}
                onAddComment={props.onAddComment}
                onLike={props.onLike}
                userInfo={props.user.userInfo}
                setFile={setFile}
                file={file}
                onClickFeed={props.onClickFeed}
                isAuthenticated={props.auth.isAuthenticated}
                onDeletePost={props.onDeletePost}
                onDeleteComment={props.onDeleteComment}
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
        onCreatePost: (content, type, mediaURL, file) => dispatch(postActions.createPost(content, type, mediaURL, file)),
        onFetchFeed: (page) => dispatch(postActions.fetchMoreFeed(page)),
        onFetchProfileFeed: (id, page) => dispatch(postActions.fetchMoreProfileFeed(id, page)),
        onAddComment: (postID, content) => dispatch(postActions.addComment(postID, content)),
        onLike: (postID) => dispatch(postActions.like(postID)),
        getProfileUserInfo: (id) => dispatch(userActions.getUserInfoById(id)),
        onClickFeed:(id) => dispatch(postActions.getPostById(id)),
        onDeletePost: (postID) => dispatch(postActions.deletePost(postID)),
        onDeleteComment: (commentID) => dispatch(postActions.deleteComment(commentID)),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer)

