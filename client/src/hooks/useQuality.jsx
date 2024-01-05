import React, { useContext, useEffect, useState } from 'react'
import PropTypes, { arrayOf } from 'prop-types'
import qualityService from '../services/quality.service'
import { toast } from 'react-toastify'

const QualityContext = React.createContext()

export const useQuality = () => {
    return useContext(QualityContext)
}
export const QualityProvider = ({ children }) => {
    const [qualities, setQualities] = useState([])
    const [errors, setErrors] = useState(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        getQualities()
    }, [])

    useEffect(() => {
        if (errors !== null) {
            toast(errors)
            setErrors(null)
        }
    }, [errors])

    function getQuality(qualitiesId) {
        // console.log('qualitiesId', qualitiesId)
        return qualities.filter((q) => {
            return qualitiesId.find((id) => id === q._id)
        })
    }

    async function getQualities() {
        try {
            const { content } = await qualityService.get()
            setQualities(content)
            setLoading(false)
        } catch (error) {
            errorCatcher(error)
        }
    }
    function errorCatcher(error) {
        // console.log('My error', error)
        const { message } = error.response.data
        setErrors(message)
    }

    return (
        <QualityContext.Provider value={ { isLoading, qualities, getQuality }}>
            {children}
        </QualityContext.Provider>
    )
}

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        arrayOf(PropTypes.node)
    ])
}
