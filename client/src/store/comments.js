import { createAction, createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment.service'
// import { nanoid } from 'nanoid'
// import { getCurrentUserId } from './users'

const commentCreateRequested = createAction('comments/commentCreateRequested')
const commentRemoveRequested = createAction('comments/commentRemoveRequested')

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        isCreating: true,
        isRemoving: true
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        // commentCreateRequested: (state) => {
        //     state.isCreating = true
        // },
        commentCreated: (state, action) => {
            state.entities.push(action.payload)
            state.isCreating = false
        },
        commentCreateFailed: (state, action) => {
            state.error = action.payload
            state.isCreating = false
        },
        // commentRemoveRequested: (state) => {
        //     state.isRemoving = true
        // },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter((comment) => {
                return comment._id !== action.payload
            })
            state.isRemoving = false
        },
        commentRemoveFailed: (state, action) => {
            state.error = action.payload
            state.isRemoving = false
        }
    }
})

const { reducer: commentsReducer, actions } = commentsSlice

const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    // commentCreateRequested,
    commentCreated,
    commentCreateFailed,
    // commentRemoveRequested,
    commentRemoved,
    commentRemoveFailed
} = actions

// function isOutDated(date) {
//     if (Date.now() - date > 10 * 60 * 1000) {
//         return true
//     } else return false
// }
export const loadCommentsList = (pageId) => async (dispatch) => {
    dispatch(commentsRequested)
    try {
        const { content } = await commentService.getComments(pageId)
        dispatch(commentsReceived(content))
    } catch (error) {
        dispatch(commentsRequestFailed(error.message))
    }
}

export const createComment = (payload) => async (dispatch, getState) => {
    dispatch(commentCreateRequested)
    // const comment = {
    //     ...payload,
    //     created_at: Date.now(),
    //     userId: getCurrentUserId()(getState()),
    //     _id: nanoid()
    // }
    try {
        // console.log(comment)
        const { content } = await commentService.createComment({ ...payload, created_at: Date.now() })
        dispatch(commentCreated(content))
    } catch (error) {
        dispatch(commentCreateFailed(error.message))
    }
}

export const removeComment = (commentId) => async (dispatch) => {
    dispatch(commentRemoveRequested())
    try {
        const { content } = await commentService.removeComment(commentId)
        console.log('content', content)
        if (!content) {
            dispatch(commentRemoved(commentId))
        }
    } catch (error) {
        dispatch(commentRemoveFailed(error.message))
    }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading
export default commentsReducer
