import React from 'react'
import PostsItem from './PostsItem/PostsItem';
import { useDispatch, useSelector } from 'react-redux';
import { toggleIsNewPostDialog } from '../../store/store';
import NewPostDialog from './NewPostDialog';


export const btn = 'waves-effect waves-light btn blue darken-4'
export default function Posts(props: any) {
    const dispatch = useDispatch()
    const posts = useSelector((state: any) => state.posts)
    const isNewPostDialog = useSelector((state: any) => state.isNewPostDialog)
    const postList = posts.map((p: any) => <PostsItem key={p.id}  id={p.id} tittle={p.tittle} body={p.body} />)
    const toggleIsNewItemPopup = (prop: boolean) => {
        dispatch(toggleIsNewPostDialog(prop))
    }
    return (
        <div className='postsContainer'>
            <div className='newPostDialogContainer' style={{height:!isNewPostDialog ?'0' : '250px'}}>
                <NewPostDialog />
            </div>
            <div className='addPostBtn'>{
                !isNewPostDialog
                ?<button
                    onClick={() => { toggleIsNewItemPopup(true) }}
                    className={btn}>
                    <i className="material-icons">add</i>
                </button>
                :<button
                    onClick={() => { toggleIsNewItemPopup(false) }}
                    className={btn}>
                    <i className="material-icons">clear</i>
                </button>}
            </div>

            {posts.length !== 0
                ? postList
                : <p>Постов пока нет</p>
            }

           
        </div>
    )
}
