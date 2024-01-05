import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import userService from '../services/user.service'
import localStorageService, { setTokens } from '../services/localStorage.service'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
// import { useUser } from './useUsers'

export const httpAuth = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/',
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
})

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState()
    const [errors, setErrors] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const history = useHistory()

    // const { updateUsers } = useUser()

    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser()
            setUser(content)
            // console.log(currentUser)
        } catch (error) {
            errorCatcher(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (localStorageService.getAccessToken() !== null) {
            getUserData()
        } else {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (errors !== null) {
            toast(errors)
            setErrors(null)
        }
    }, [errors])

    const randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    async function signUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post('accounts:signUp', {
                email,
                password,
                returnSecureToken: true
            })
            // console.log(data)
            setTokens(data)
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(1, 200),
                // image: `https://avatars.dicebear.com/api/avataaars/${(
                image: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}`,
                ...rest
            })
        } catch (error) {
            errorCatcher(error)
            // console.log(error)
            const { code, message } = error.response.data.error
            if (code === 400) {
                if (message === 'EMAIL_EXISTS') {
                    const errorObject = {
                        email: 'Пользователь с таким Email уже существует'
                    }
                    throw errorObject
                }
            }
        }
    }

    async function createUser(data) {
        try {
            const { content } = await userService.create(data)
            // console.log(content)
            setUser(content)
        } catch (error) {
            errorCatcher(error)
        }
    }

    async function updateUser(id, data) {
        try {
            // console.log(id)
            // console.log(data)
            const { content } = await userService.update(id, data)
            // console.log(content)
            setUser((prevState) => {
                return {
                    ...prevState,
                    ...content
                }
            })
        } catch (error) {
            errorCatcher(error)
        }
    }

    async function signIn({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post('accounts:signInWithPassword', {
                email,
                password,
                returnSecureToken: true
            })
            // console.log(data)
            setTokens(data)
            await getUserData()
            // await createUser({ _id: data.localId, email, ...rest })
        } catch (error) {
            errorCatcher(error)
            const { code, message } = error.response.data.error
            if (code === 400) {
                if (message === 'INVALID_PASSWORD') {
                    throw new Error('Email или пароль введены некорректно')
                }
                if (message.indexOf('TOO_MANY_ATTEMPTS_TRY_LATER') === 0) {
                    throw new Error('Слишком много попыток входа. Попробуйте позднее')
                }
            }
        }
    }

    function logOut() {
        localStorageService.removeAuthData()
        setUser(null)
        history.push('/')
    }

    function errorCatcher(error) {
        console.log('My error', error)
        const { message } = error.response.data
        setErrors(message)
    }

    return (
        <AuthContext.Provider value={ { signUp, signIn, logOut, updateUser, currentUser } }>
            {!isLoading ? children : 'Loading...' }
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default AuthProvider
