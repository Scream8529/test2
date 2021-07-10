import { STATES } from 'mongoose'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Api } from '../../../api/api'
import { deleteCommentAC, editCommentAC } from '../../../store/store'

export default function Comment(props: any) {
    const dispatch = useDispatch()
    const [comment, setComment] = useState({
        isEdit: false,
        currentText: props.text,
        newText:props.text
    })
    const deleteComment = () => {
        Api.deleteComment(props.id)
            .then(res => {
                dispatch(deleteCommentAC(props.id))
            })
    }
    const saveComment=()=>{
        Api.editComment(props.id, comment.newText)
        .then(res=>{
            if(res.statusCode ===0){
            dispatch(editCommentAC({id:props.id, text:comment.newText}))
            setComment({...comment,currentText:comment.newText, isEdit:false})}
        })
    }
    const canselEditComment=()=>{
        setComment({...comment, newText: comment.currentText, isEdit:false})
    }
    return (
        <div className='commentContent'>
            {comment.isEdit
            ?<div className="input-field">
            <textarea
                value={comment.newText}
                onChange={(e) => { setComment({...comment, newText:e.target.value}) }}
                name="newText"
                id="newText"
                className="materialize-textarea"></textarea>
            <label htmlFor="newText"></label>
        </div>
            :<p>{comment.newText}</p>}
            <div className='commentBtn'>
                {comment.isEdit
                ?<><button
                onClick={()=>{saveComment()}}
                    className="waves-effect waves-light btn"><i className="material-icons">check</i></button>
                <button
                    onClick={()=>{canselEditComment()}}
                    className="waves-effect waves-light btn"><i className="material-icons">clear
                    </i></button></>
                :<button
                    onClick={()=>{setComment({...comment, isEdit:true})}}
                    className="waves-effect waves-light btn"><i className="material-icons">settings</i></button>}
                <button
                    onClick={() => { deleteComment() }}
                    className="waves-effect waves-light btn"><i className="material-icons">delete</i></button>
            </div>
        </div>
    )
}
