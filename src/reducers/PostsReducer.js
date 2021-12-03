import { 
    POSTS_LOADING_SUCCESS ,
    POSTS_LOADING_FAIL, 
    ADD_POST,DELETE_POST, 
    SET_POST,
    UPDATE_POST
} from "../Context/contants";

export const PostsReducer = (state, action) => {
    const { type, payload} = action;
    switch (type) {
        case POSTS_LOADING_SUCCESS:
            return {
                ...state,
                posts: payload.data,
                postsLoading : payload.postsLoading
            }
        case POSTS_LOADING_FAIL:
            return {
                ...state,
                posts: [],
                postsLoading : false
            }
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts,  payload]
            }
        case UPDATE_POST: 
            const postsUpdate = state.posts.map( post=> post._id === payload._id ? payload : post )
            return {
                ...state,
                posts: postsUpdate
            }

        case DELETE_POST:
            const newPosts = state.posts.filter(post => post._id !== payload.id)
            return {
                ...state,
                posts: newPosts
            }
        case SET_POST: 
            const post = state.posts.find(post => post._id === payload);
            return {
                ...state,
                post: post
            }    

        default: 
            return state;
    }
}