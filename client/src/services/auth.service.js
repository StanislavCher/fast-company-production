import axios from 'axios'
import localStorageService from './localStorage.service'
import config from '../config.json'

const httpAuth = axios.create({
    baseURL: config.apiEndpoint + '/auth/',
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
})

export const authService = {
    register: async function (payload) {
        // try {
        const { data } = await httpAuth.post('signUp', payload)
        return data
        // } catch (e) {
        //
        // }
    },
    login: async function ({ email, password }) {
        // try {
        const { data } = await httpAuth.post('signInWithPassword', {
            email,
            password,
            returnSecureToken: true
        })
        return data
    },
    refresh: async function () {
        // try {
        const { data } = await httpAuth.post('token', {
            grant_type: 'refresh_token',
            refresh_token: localStorageService.getRefreshToken()
            // refresh_token: refreshToken
        })
        // console.log('1', data)
        return data
    }
}
