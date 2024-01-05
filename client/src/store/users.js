import { createAction, createSlice } from '@reduxjs/toolkit'
import userService from '../services/user.service'
import { authService } from '../services/auth.service'
import localStorageService, { setTokens } from '../services/localStorage.service'
// import getRandomInt from '../utils/getRandomInt'
import history from '../utils/history'
import generateAuthError from '../utils/generateAuthError'
// import isOutDated from '../utils/isOutdated'

const authRequested = createAction('users/authRequested')
// const userCreateRequested = createAction('users/userCreateRequested')
// const createUserFailed = createAction('users/createUserFailed')
const userUpdateRequested = createAction('users/userUpdateRequested')
const userUpdateFailed = createAction('users/userUpdateFailed')

const initialState = localStorageService.getAccessToken()
    ? {
        entities: null,
        isLoading: true,
        error: null,
        auth: { userId: localStorageService.getUserId() },
        isLoggedIn: true,
        dataLoaded: false
    }
    : {
        entities: null,
        isLoading: false,
        error: null,
        auth: null,
        isLoggedIn: false,
        dataLoaded: false
    }

const usersSlice = createSlice({
    name: 'users',
    initialState,
    // {
    //     entities: null,
    //     isLoading: true,
    //     error: null,
    //     auth: null,
    //     isLoggedIn: false,
    //     dataLoaded: false
    //     // lastFetch: null
    // }
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true
        },
        usersReceived: (state, action) => {
            state.entities = action.payload
            state.dataLoaded = true
            // state.lastFetch = Date.now()
            state.isLoading = false
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        authRequestSuccess: (state, action) => {
            // state.auth = { ...action.payload, isLoggedIn: true }
            state.auth = action.payload
            state.isLoggedIn = true
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = []
            }
            state.entities.push(action.payload)
        },
        userLoggedOut: (state) => {
            state.entities = null
            state.isLoggedIn = false
            state.auth = null
            state.dataLoaded = false
        },
        userUpdated: (state, action) => {
            // console.log(state)
            // console.log(action)
            const index = state.entities.findIndex(
                (u) => u._id === action.payload._id)
            state.entities[index] =
                { ...state.entities[index], ...action.payload }
        },
        authRequested: (state) => {
            state.error = null
        }
        // usersUpdateFailed: (state, action) => {
        //     state.error = action.payload
        // }
    }
})

export const loadUsersList = () => async (dispatch) => {
    // const { lastFetch } = getState().users
    // console.log(lastFetch)
    // if (isOutDated(lastFetch)) {
    dispatch(usersRequested)
    try {
        const { content } = await userService.get()
        dispatch(usersReceived(content))
    } catch (error) {
        dispatch(usersRequestFailed(error.message))
    }
    // }
}
export const getUsers = () => (state) => state.users.entities
export const getUsersLoadingStatus = () => (state) => state.users.isLoading

export const getUsersByIds = (userIds) => (state) => {
    if (userIds && state.users.entities) {
        return state.users.entities.filter((u) => {
            return u._id === userIds
        })[0]
    } else return []
}

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn
export const getDataStatus = () => (state) => state.users.dataLoaded

export const getCurrentUserId = () => (state) => state.users.auth.userId

export const getAuthErrors = () => (state) => state.users.error
export const getCurrentUserData = () => (state) => {
    return state.users.entities
        ? state.users.entities.find((u) => u._id === state.users.auth.userId)
        : null
}

export const signUp = (payload) => async (dispatch) => {
    // const { lastFetch } = getState().users
    // console.log(lastFetch)
    // if (isOutDated(lastFetch)) {
    dispatch(authRequested)
    try {
        const data = await authService.register(payload)
        localStorageService.setTokens(data)
        setTokens(data)
        // const { content } = await userService.get()
        dispatch(authRequestSuccess({ userId: data.userId }))
        history.push('/users')
        // dispatch(createUser({
        //     _id: data.localId,
        //     email,
        //     rate: getRandomInt(1, 5),
        //     completedMeetings: getRandomInt(1, 200),
        //     image: `https://avatars.dicebear.com/api/avataaars/${(
        //         Math.random() + 1
        //     )
        //         .toString(36)
        //         .substring(7)}.svg`,
        //     ...rest
        // }))
    } catch (error) {
        const { code, message } = error.response.data.error
        if (code === 400) {
            const errorMessage = generateAuthError(message)
            dispatch(authRequestFailed(errorMessage))
        } else {
            dispatch(authRequestFailed(error.message))
        }
    }
    // }
}

export const login = ({ payload, redirect }) => async (dispatch) => {
    const { email, password } = payload
    dispatch(authRequested())
    try {
        const data = await authService.login({ email, password })
        localStorageService.setTokens(data)
        setTokens(data)
        dispatch(authRequestSuccess({ userId: data.userId }))
        history.push(redirect)
    } catch (error) {
        const { code, message } = error.response.data.error
        if (code === 400) {
            const errorMessage = generateAuthError(message)
            dispatch(authRequestFailed(errorMessage))
        } else {
            dispatch(authRequestFailed(error.message))
        }
    }
}

// export function createUser(payload) {
//     return async function (dispatch) {
//         dispatch(userCreateRequested())
//         try {
//             const { content } = await userService.create(payload)
//             // console.log(content)
//             dispatch(userCreated(content))
//             history.push('/users')
//         } catch (error) {
//             dispatch(createUserFailed(error.message))
//         }
//     }
// }

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData()
    dispatch(userLoggedOut())
    history.push('/')
}

export const updateUserData = (id, data) => async (dispatch) => {
    dispatch(userUpdateRequested())
    try {
        const { content } = await userService.update(id, data)
        dispatch(userUpdated({ ...content, _id: id }))
        history.push(`/users/${id}`)
        // console.log('1', { ...content, _id: id })
    } catch (error) {
        dispatch(userUpdateFailed(error.message))
    }
}

const { reducer: usersReducer, actions } = usersSlice

const {
    usersRequested,
    usersReceived,
    usersRequestFailed,
    authRequestSuccess,
    authRequestFailed,
    // userCreated,
    userLoggedOut,
    userUpdated
} = actions

export default usersReducer
