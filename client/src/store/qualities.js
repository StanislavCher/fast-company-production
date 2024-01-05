import { createSlice } from '@reduxjs/toolkit'
import qualityService from '../services/quality.service'
import isOutDated from '../utils/isOutdated'

const qualitiesSlice = createSlice({
    name: 'qualities',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true
        },
        qualitiesReceived: (state, action) => {
            state.entities = action.payload
            state.lastFetch = Date.now()
            state.isLoading = false
        },
        qualitiesRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { reducer: qualitiesReducer, actions } = qualitiesSlice

const { qualitiesRequested, qualitiesReceived, qualitiesRequestFailed } = actions

// function isOutDated(date) {
//     if (Date.now() - date > 10 * 60 * 1000) {
//         return true
//     } else return false
// }
export const loadQualitiesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().qualities
    // console.log(lastFetch)
    if (isOutDated(lastFetch)) {
        dispatch(qualitiesRequested)
        try {
            const { content } = await qualityService.get()
            dispatch(qualitiesReceived(content))
        } catch (error) {
            dispatch(qualitiesRequestFailed(error.message))
        }
    }
}
export const getQualities = () => (state) => state.qualities.entities
export const getQualitiesLoadingStatus = () => (state) => state.qualities.isLoading

export const getQualitiesByIds = (qualityIds) => (state) => {
    if (qualityIds) {
        return state.qualities.entities.filter((q) => {
            return qualityIds.find((id) => id === q._id)
        })
    } else return []
}

export default qualitiesReducer
