import React from 'react'

export default function PostsItem(props: any) {
    return (
        <div className="postsItem">
            <div className="postHeader">
                <h3>{props.tittle}</h3>
            </div>
            <div className="postBody">
                <p>{props.body}</p>
            </div>
            <div>
                <button className="waves-effect waves-light btn"><i className="material-icons">settings</i></button>
                <button className="waves-effect waves-light btn"><i className="material-icons">delete</i></button>
            </div>

        </div>
    )
}
