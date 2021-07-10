import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Api } from './../api/api';

const TOGGLE_IS_NEW_ITEM_POPUP = 'TOGGLE_IS_NEW_ITEM_POPUP'
const GET_POSTS = 'GET_POSTS'
const TOGGLE_IS_INIT = 'TOGGLE_IS_INIT'
const ADD_POST_TO_LIST = 'ADD_POST_TO_LIST'
const DELETE_POST = 'DELETE_POST'
const GET_CURRENT_POST = 'GET_CURRENT_POST'
const CHANGE_POST = 'CHANGE_POST'
const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'
const EDIT_COMMENT = 'EDIT_COMMENT'

interface IPost {
    id: number | null;
    tittle: string | null
    body: string | null
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
    isNewPostDialog: false
}
const PostsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_POSTS:
            return { ...state, posts: action.payload }
        case GET_CURRENT_POST:
            return { ...state, currentPost: action.payload }
        case TOGGLE_IS_INIT:
            return { ...state, isInit: action.payload }
        case TOGGLE_IS_NEW_ITEM_POPUP:
            return { ...state, isNewPostDialog: action.payload }
        case ADD_POST_TO_LIST:
            return { ...state, posts: [...state.posts, action.payload] }
        case ADD_COMMENT:
            return { ...state, currentPost: { ...state.currentPost, comments: [...state.currentPost.comments, action.payload] } }
        case DELETE_COMMENT:
            return { ...state, currentPost: { ...state.currentPost, comments: [...state.currentPost.comments.filter((c:any) => c.id !== action.payload)] } }
        case EDIT_COMMENT:
            return {
                ...state, currentPost: {
                    ...state.currentPost, comments: [...state.currentPost.comments.map((c: any) => {
                        if (c.id === action.id) {
                            c.text = action.text
                            return c
                        }
                        return c
                    })]
                }
            }
        case DELETE_POST:
            return { ...state, posts: [...state.posts.filter((p: IPost) => p.id !== action.payload)] }
        case CHANGE_POST:
            return {
                ...state, posts: [...state.posts.map((p: IPost) => {
                    if (p.id === action.id) {
                        p.tittle = action.tittle;
                        p.body = action.body
                        return p
                    }
                    return p

                })]
            }
        default:
            return state;
    }
}
export const getPosts = (payload: Array<IPost>) => ({ type: GET_POSTS, payload })
export const getCurrentPost = (payload: IPost) => ({ type: GET_CURRENT_POST, payload })
export const changePost = (payload: any) => ({ type: CHANGE_POST, payload })
export const addPostToList = (payload: Array<IPost>) => ({ type: ADD_POST_TO_LIST, payload })
export const deletePostAC = (payload: number) => ({ type: DELETE_POST, payload })
export const toggleIsNewPostDialog = (payload: boolean) => ({ type: TOGGLE_IS_NEW_ITEM_POPUP, payload })
export const toggleIsInit = (payload: boolean) => ({ type: TOGGLE_IS_INIT, payload })

export const addCommentAC = (payload: any) => ({ type: ADD_COMMENT, payload })
export const editCommentAC = (payload: any) => ({ type: EDIT_COMMENT, payload })
export const deleteCommentAC = (payload: number) => ({ type: DELETE_COMMENT, payload })


export const initializationTC = () => {
    return (dispatch: any) => {
        Api.getAllPost()
            .then(res => {
                dispatch(getPosts(res.posts))
                dispatch(toggleIsInit(true))

            })
    }
}



export let store = createStore(PostsReducer, applyMiddleware(thunk))

