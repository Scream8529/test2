import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Api } from '../../api/api';
import { addPostToList,  toggleIsNewPostDialog } from './../../store/store';


export default function NewPostDialog(props: any) {
    const [state, setState] = useState({
        tittle: '',
        body: ''
    })
    const dispatch = useDispatch()
    const  sendData = async (e: React.FormEvent) => {
        e.preventDefault()
        if (state.tittle !== '' && state.body !== ''){
            Api.createPost(state.tittle, state.body)
            .then(res=>{
                dispatch(addPostToList(res))
                dispatch(toggleIsNewPostDialog(false))
                setState({tittle: '', body: ''})
            })        
    }
        else alert('Заполните все поля!')
    }
    const changeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setState({
            ...state, [e.target.name]: e.target.value
        })
    }
    return (
        <div
            className="DialogContainer">
            <form onSubmit={(e) => { sendData(e) }}>
                <div>
                    <div className="input-field">
                        <input
                            onChange={(e) => { changeInput(e) }}
                            value={state.tittle}
                            name="tittle"
                            id="newPostTittle"
                            type="text"
                            className="validate" />
                        <label htmlFor="newPostTittle">Заголовок</label>
                    </div>
                    <div className="input-field">
                        <textarea
                            value={state.body}
                            onChange={(e) => { changeInput(e) }}
                            name="body"
                            id="newPostBody"
                            className="materialize-textarea"></textarea>
                        <label htmlFor="newPostBody"></label>
                    </div>
                    <div>
                        <button
                            className="waves-effect waves-light btn">Создать</button>
                    </div>
                </div>
            </form>
        </div>

    )
}
