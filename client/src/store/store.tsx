import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Api } from './../api/api';

const TOGGLE_IS_NEW_ITEM_POPUP = 'TOGGLE_IS_NEW_ITEM_POPUP'
const GET_POSTS = 'GET_POSTS'
const TOGGLE_IS_INIT = 'TOGGLE_IS_INIT'
const ADD_POST_TO_LIST = 'ADD_POST_TO_LIST'

interface IPost {
    id: number;
    tittle: string
    body: string
}
const initialState = {
    currentPost: {
        id: null,
        tittle: null,
        body: null,
        comments: []
    },
    posts: [],
    isInit: false,
    isNewPostPopup: false
}

const PostsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_POSTS:
            return { ...state, posts: action.payload }
        case TOGGLE_IS_INIT:
            return { ...state, isInit: action.payload }
        case TOGGLE_IS_NEW_ITEM_POPUP:
            return { ...state, isNewPostPopup: action.payload }
        case ADD_POST_TO_LIST:
            return { ...state, posts: [...state.posts, action.payload] }
        default:
            return state;
    }
}
export const getPosts = (payload: Array<IPost>) => ({ type: GET_POSTS, payload })
export const addPostToList = (payload: Array<IPost>) => ({ type: ADD_POST_TO_LIST, payload })
export const toggleIsNewPostPopup = (payload: boolean) => ({ type: TOGGLE_IS_NEW_ITEM_POPUP, payload })
export const toggleIsInit = (payload: boolean) => ({ type: TOGGLE_IS_INIT, payload })

export const createPostTC = (tittle: string, body: string) => {
    return (dispatch: any) => {
        Api.createPost(tittle, body)
            .then(res =>
                dispatch(addPostToList(res))
            )
    }
}

export const initializationTC = () => {
    return (dispatch: any) => {
        Api.getAllPost()
            .then(res => {
                dispatch(getPosts(res.posts))
                dispatch(toggleIsInit(true))
                dispatch(toggleIsNewPostPopup(false))
            })
    }
}



export let store = createStore(PostsReducer, applyMiddleware(thunk))

