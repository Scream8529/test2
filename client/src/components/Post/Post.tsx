import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Api } from '../../api/api'
import { addCommentAC, getCurrentPost } from '../../store/store'
import Loader from '../Loader/Loader'
import { btn } from '../Posts/Posts'
import Comment from './Comment/Comment'


export default function Post() {
    const params: any = useParams()
    const currentPost = useSelector((state: any) => state.currentPost)
    const dispatch = useDispatch()
    const [state, setState] = useState({
        newCommentText: '',
    })
    useEffect(() => {
        dispatch(getCurrentPost({
            id: null,
            tittle: null,
            body: null
        }))
        Api.getCurrentPost(params.id)
            .then(res => {
                if (res.statusCode === 0) {
                    dispatch(getCurrentPost(res))
                }
            })
    }, [])
    const addComment = () => {
        Api.addComment(params.id, state.newCommentText)
            .then(res => {
                if (res.statusCode === 0) {
                    dispatch(addCommentAC(res.comment))
                    setState({...state, newCommentText:''})
                }
            })
    }

    if (currentPost.id === null) {
        return <Loader />
    }

    return (
        <div>
            <div className="post blue lighten-1 white-text">
                <h3>{currentPost.post.tittle}</h3>
                <p>{currentPost.post.body}</p>
            </div>
            <div className="addComments ">
                <h3>Добавить коментарий:</h3>
                <div className="input-field">
                    <input
                        value={state.newCommentText}
                        onChange={(e) => { setState({ ...state, newCommentText: e.target.value }) }}
                        name="text"
                        id="text"
                        type="text"
                        className="validate " />
                    <label htmlFor="text">Text</label>
                </div>
                <button 
                onClick={()=>{addComment()}}
                className={btn}>Добавить коментарий</button>
            </div>
            <div className="comments">
                {currentPost.comments.length !== 0 
                ?   currentPost.comments.map((c:any)=><Comment key={c.id} id={c.id} text={c.text}/>)
                    :<p>Коментариев пока нет, стань первым!!</p>

                }
            </div>
        </div>
    )
}
