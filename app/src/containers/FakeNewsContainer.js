import React, { useState, useEffect, useCallback } from 'react'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import { connect } from 'react-redux'
import * as postActions from '../store/actions/postActions'
import * as userActions from '../store/actions/userActions'
import useSocket from 'use-socket.io-client';
import FakeNews from '../components/FakeNews/FakeNews'
const ENDPOINT = "http://localhost:5001";

const FakeNewsContainer = props => {



    const [pageNumber, setPageNumber] = useState(0);

    const onProfile = () => {
        props.onFetchProfileFakeFeed(props.id, pageNumber);
        props.getProfileUserInfo(props.id);
    }

    useEffect(() => {
        props.id ? onProfile() : props.onFetchFakeFeed(pageNumber);
    }, [pageNumber]);

    const [content, setContent] = useState("");
    const [commentContent, setComment] = useState("");

    const [type, setType] = useState(1);
    const [file, setFile] = useState('');


    const UpdatePostHandler = () => {

        props.onUpdatePost(content);
        setComment(props.post.content)
    }
  
    const handleOnDocumentBottom = useCallback(() => {
        setPageNumber(curr => curr + 1)

    }, [])
    useBottomScrollListener(handleOnDocumentBottom, 400)

  
    return (
        <>
            <FakeNews
                profileUser={props.user.profileUser}
                id={props.id}
                content={content}
                setContent={setContent}
                type={type}
                setType={setType}
                onFetchFeed={props.onFetchFeed}
                onFetchFakeFeed={props.onFetchFakeFeed}
                posts={props.post.feed}
                userInfo={props.user.userInfo}
                setFile={setFile}
                file={file}
                onClickFeed={props.onClickFeed}
                isAuthenticated={props.auth.isAuthenticated}
                onDeletePost={props.onDeletePost}
                onUpdatePost={props.onUpdatePost}
                onFakePost={props.onFakePost}
                postId={props.post.id}

            />
        </>
    )
}

const mapStateToProps = state => ({
    post: state.post,
    user: state.user,
    auth: state.auth,
    comment: state.comment


})

const mapDispatchToProps = dispatch => {
    return {
        onFetchProfileFakeFeed: (id, page) => dispatch(postActions.fetchMoreProfileFakeFeed(id, page)),
        getProfileUserInfo: (id) => dispatch(userActions.getUserInfoById(id)),
        onClickFeed:(id) => dispatch(postActions.getPostById(id)),
        onDeletePost: (postID) => dispatch(postActions.deletePost(postID)),
        onUpdatePost: (postID, content) => dispatch(postActions.updatePoste(postID, content)),
        onFetchFakeFeed: (page) => dispatch(postActions.fetchMoreFakeFeed(page)),
        onFetchProfileFeed: (id, page) => dispatch(postActions.fetchMoreProfileFeed(id, page)),
        onFetchFeed: (page) => dispatch(postActions.fetchMoreFeed(page)),


    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FakeNewsContainer)

