import React, { useEffect } from 'react'
// import { useProfession } from '../../hooks/useProfession'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
// import { loadQualitiesList } from '../../store/qualities'
import { getProfessionById, getProfessionsLoadingStatus, loadProfessionsList } from '../../store/professions'

const Profession = ({ id }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadProfessionsList())
    }, [])
    // console.log(id)
    // const { isLoading, getProfession } = useProfession()
    // const { getProfession } = useProfession()
    const isLoading = useSelector(getProfessionsLoadingStatus())
    const prof = useSelector(getProfessionById(id))
    // console.log(isLoading)
    // const prof = getProfession(id)
    // console.log('1', id)
    // console.log('2', prof)
    // console.log('3', prof1)

    // const profName = prof.name
    // console.log(profName)
    if (!isLoading) {
        return <p>{prof.name}</p>
    } else {
        return 'Loading ...'
    }
}

Profession.propTypes = {
    id: PropTypes.string
}

export default Profession
