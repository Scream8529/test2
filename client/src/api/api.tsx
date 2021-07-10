import axios from 'axios'

const instance = axios.create({
    baseURL: "http://192.168.0.108:5000/"
})

export const Api = {
    getAllPost() {
        return instance.get("posts")
            .then(res => {
                return res.data
            })
    },
    createPost(tittle: string, body: string) {
        return instance.post("posts", { tittle, body })
            .then(res => {
                return res.data
            })
    },
    deletePost(id: number) {
        return instance.delete(`posts?id=${id}`)
            .then(res => {
                return res.data
            })
    },
    getCurrentPost(id: number) {
        return instance.get(`posts/post?id=${id}`)
            .then(res => {
                return res.data
            })
    }
    ,
    savePostChanges(id: number, tittle: string, body: string) {
        return instance.post(`posts/post`, { id, tittle, body })
            .then(res => {
                return res.data
            })
    },
    addComment(id:number, text:string){
        return instance.post(`comment`, { id, text})
            .then(res => {
                return res.data
            })
    },
    editComment(id:number, text:string){
        return instance.post(`comment`, { id, text})
            .then(res => {
                return res.data
            })
    },
    deleteComment(id:number){
        return instance.delete(`comment?id=${id}`)
        .then(res => {
            return res.data
        })
    }


}


