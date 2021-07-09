import React from 'react'
import PostsItem from './PostsItem/PostsItem';
import NewPostPopup from './NewPostPopup';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { toggleIsNewPostPopup } from '../../store/store';

export default function Posts(props: any) {
    const dispatch = useDispatch()
    const posts = useSelector((state: any) => state.posts)
    const isNewPostPopup = useSelector((state: any) => state.isNewPostPopup)
    const postList = posts.map((p: any) => <PostsItem tittle={p.tittle} body={p.body} />)
    const toggleIsNewItemPopup = (prop: boolean) => {
        dispatch(toggleIsNewPostPopup(prop))
    }
    return (
        <div className='postsContainer'>
            {posts.length !== 0
                ? postList
                : <p>Постов пока нет</p>
            }
            <div className='addPostBtn'>
                <button
                    onClick={() => { toggleIsNewItemPopup(true) }}
                    className="waves-effect waves-light btn">
                    <i className="material-icons">add</i>
                </button>
            </div>
            {
                isNewPostPopup &&
                <NewPostPopup toggleIsNewItemPopup={toggleIsNewItemPopup} />
            }
        </div>
    )
}
