import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:5000/"
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
    }
}


