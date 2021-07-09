import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createPostTC } from './../../store/store';


export default function NewPostPopup(props: any) {
    const [state, setState] = useState({
        tittle: '',
        body: ''
    })
    const dispatch = useDispatch()
    const closePopup = (e: React.MouseEvent) => {
        props.toggleIsNewItemPopup(false)
    }
    const sendData = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(createPostTC(state.tittle, state.body))
    }
    const changeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setState({
            ...state, [e.target.name]: e.target.value
        })
    }
    return (
        <div
            onClick={(e) => { closePopup(e) }}
            className="backSide">
            <div
                onClick={(e) => { e.stopPropagation() }}
                className="popup">
                <div className="popupHeader">Новый пост</div>
                <div className="popupBody">
                    <form onSubmit={(e) => { sendData(e) }}>
                        <div>
                            <div className="input-field col s6">
                                <input
                                    onChange={(e) => { changeInput(e) }}

                                    name="tittle"
                                    id="tittle"
                                    type="text"
                                    className="validate" />
                                <label htmlFor="tittle">Заголовок</label>
                            </div>
                            <div className="input-field col s12">
                                <textarea

                                    onChange={(e) => { changeInput(e) }}
                                    name="body"
                                    id="body"
                                    className="materialize-textarea"></textarea>
                                <label htmlFor="body"></label>
                            </div>
                            <div>
                                <button
                                    className="waves-effect waves-light btn">Создать</button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}
