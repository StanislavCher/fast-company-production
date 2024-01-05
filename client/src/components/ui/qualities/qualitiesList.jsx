import React, { useEffect } from 'react'
import Quality from './quality'
import PropTypes from 'prop-types'
// import { useQuality } from '../../../hooks/useQuality'
import { useDispatch, useSelector } from 'react-redux'
import { getQualitiesByIds, getQualitiesLoadingStatus, loadQualitiesList } from '../../../store/qualities'

const QualitiesList = ({ qualities }) => {
    // console.log(qualities)
    // const { isLoading, getQuality } = useQuality()
    // const { getQuality } = useQuality()

    const isLoading = useSelector(getQualitiesLoadingStatus())
    // const qualitiesObject = getQuality(qualities)
    const qualitiesObject = useSelector(getQualitiesByIds(qualities))

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadQualitiesList())
    }, [])

    // console.log(qualitiesObject)
    // const qualitiesObject = useSelector(getQualities())

    if (!isLoading) {
        return (
            <>
                {qualitiesObject.map((q) => {
                    return <Quality key={q._id} {...q} />
                })
                }
            </>)
    } else {
        return 'Loading ...'
    }

    // return (
    //     <>
    //         {qualities.map((q) => {
    //             return <Quality key={q._id} {...q} />
    //         })
    //         }
    //     </>
    // )
}

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
}

export default QualitiesList
