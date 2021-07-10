import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Api } from '../../../api/api'
import { changePost, deletePostAC} from '../../../store/store'
import { btn } from '../Posts'

export default function PostsItem(props: any) {
    const [state, setState] = useState({
        id:props.id,
        tittle: props.tittle,
        body: props.body,
        isEdit: false,
        isSaveProgress:false,
        isDeleteProgress:false
    })
    const dispatch = useDispatch()
    const toggleIsEdit =(prop:boolean)=>{
        setState({
            ...state, isEdit:prop
        })
    }
    const saveEditPost = ()  =>{
        setState({...state, isSaveProgress:true})
        Api.savePostChanges(state.id, state.tittle,state.body )
        .then(res=>{
            if (res.statusCode === 0){
                dispatch(changePost({id:state.id, tittle: state.tittle, body:state.body}))
                toggleIsEdit(false)
            }
        })
       
    }
    const changeInput=(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setState({
            ...state, [e.target.name]: e.target.value
        })
    }
    const deletePost =()=>{
        setState({...state, isDeleteProgress:true})
        Api.deletePost(state.id)
        .then(res=>{
            if (res.statusCode === 0){
            dispatch(deletePostAC(state.id))
            toggleIsEdit(false)
        }
        })
        
    }
    return (
        <div className="postsItem blue lighten-1 white-text">
            <div className="postHeader">
                {state.isEdit
                    ? <div className="input-field">
                        <input
                            value={state.tittle}
                            onChange={(e) => { changeInput(e) }}
                            name="tittle"
                            id="tittle"
                            type="text"
                            className="validate" />
                        <label htmlFor="tittle"></label>
                    </div>
                    : <NavLink to={`/posts/${state.id}`} ><p>{state.tittle}</p></NavLink>}
            </div>
            <div className="postBody">
            {state.isEdit
                ?<div className="input-field">
                        <textarea
                            value={state.body}
                            onChange={(e) => { changeInput(e) }}
                            name="body"
                            id="body"
                            className="materialize-textarea"></textarea>
                        <label htmlFor="body"></label>
                    </div>
                :<p>{state.body}</p>}
            </div>
            <div>
                {state.isEdit
                    ? <button 
                    disabled={state.isSaveProgress}
                    onClick={()=>{saveEditPost()}}
                    className={btn}><i className="material-icons">save</i></button>
                    : <button 
                    
                    onClick={()=>{toggleIsEdit(true)}}
                    className={btn}><i className="material-icons">settings</i></button>
                }
                <button 
                disabled={state.isDeleteProgress}
                onClick={()=>{deletePost()}}
                className={btn}><i className="material-icons">delete</i></button>
            </div>

        </div>
    )
}
