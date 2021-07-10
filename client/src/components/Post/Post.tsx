import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCurrentPostTC } from '../../store/store'
import Loader from '../Loader/Loader'


export default function Post() {
    const params:any = useParams()
    const currentPost = useSelector((state:any) => state.currentPost)
    const dispatch = useDispatch()
    const [state, setState] = useState({
        newCommentText:'',
    })
    useEffect(() => {
        dispatch(getCurrentPostTC(params.id))
    }, [])
    if (currentPost.id === null) {
        return <Loader />
      }
    return (
        <div>
            <div className="post">
                <h3>{currentPost.post.tittle}</h3>
                <p>{currentPost.post.body}</p>
            </div>
            <div className="addComments">
            <div className="input-field col s6">
                        <input
                            value={state.newCommentText}
                            onChange={(e) => { setState({...state, newCommentText:e.target.value})}}
                            name="text"
                            id="text"
                            type="text"
                            className="validate" />
                        <label htmlFor="text">Text</label>
                    </div>
                    <button className="waves-effect waves-light btn">Добавить коментарий</button>
            </div>
            <div className="comments">

            </div>
        </div>
    )
}
