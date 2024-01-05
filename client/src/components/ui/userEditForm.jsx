import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
// import api from '../../api'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
// import CheckBoxField from '../common/form/checkBoxField'
import PropTypes from 'prop-types'
// import { useHistory } from 'react-router-dom'
// import { useProfession } from '../../hooks/useProfession'
// import { useQuality } from '../../hooks/useQuality'
// import { useAuth } from '../../hooks/useAuth'
import { getQualities, getQualitiesLoadingStatus } from '../../store/qualities'
import { useDispatch, useSelector } from 'react-redux'
import { getProfessions, getProfessionsLoadingStatus } from '../../store/professions'
import { getCurrentUserData, getUsersLoadingStatus, updateUserData } from '../../store/users'

const UserEditForm = ({ userId }) => {
    // console.log('render')
    // const { isLoading: userLoading, updateUser, currentUser } = useAuth()
    // const { isLoading: userLoading, updateUser } = useAuth()
    const dispatch = useDispatch()
    const userLoading = useSelector(getUsersLoadingStatus())
    const currentUser = useSelector(getCurrentUserData())
    // console.log(currentUser)
    // const [professions, setProfessions] = useState([])
    // const { isLoading: professionLoading, profession } = useProfession()
    const professionLoading = useSelector(getProfessionsLoadingStatus())
    const profession = useSelector(getProfessions())
    // console.log(profession)
    const professions = profession.map((prof) => ({
        label: prof.name,
        value: prof._id
    }))
    // console.log(professions)
    // const [qualities, setQualities] = useState([])
    // const { isLoading: qualityLoading, qualities } = useQuality()
    const qualities = useSelector(getQualities())
    const qualityLoading = useSelector(getQualitiesLoadingStatus())
    // console.log('isLoading', isLoading)
    // console.log(qualities)
    // useEffect(() => {
    //     const qualitiesList = qualities.map((q) => ({
    //         label: q.name,
    //         value: q._id,
    //         color: q.color
    //     }))
    //     const defaultQualitiesList = currentUser.qualities.map((q) => {
    //         return qualitiesList.find((defQ) => {
    //             return (defQ.value === q)
    //         })
    //     })
    //     const initValue = {
    //         name: currentUser.name,
    //         email: currentUser.email,
    //         profession: currentUser.profession,
    //         sex: currentUser.sex,
    //         qualities: defaultQualitiesList
    //         // qualities: currentUser.qualities
    //     }
    // }, [isLoading])
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id,
        color: q.color
    }))
    // console.log(qualitiesList)
    // const defaultQualitiesList = currentUser.qualities.map((q) => {
    //     return qualitiesList.find((defQ) => {
    //         return (defQ.value === q)
    //     })
    // })
    // .map((q) => {
    //     return q?.label
    // })
    // console.log('defaultQualitiesList', defaultQualitiesList)

    const initValue = {
        name: currentUser.name,
        email: currentUser.email,
        profession: currentUser.profession,
        sex: currentUser.sex,
        qualities: currentUser.qualities.map((q) => {
            return qualitiesList.find((defQ) => {
                return (defQ.value === q)
            })
        })
        // defaultQualitiesList
        // qualities: currentUser.qualities
    }

    const [data, setData] = useState({
        // name: currentUser.name,
        // email: currentUser.email,
        // profession: currentUser.profession,
        // sex: currentUser.sex,
        // qualities: currentUser.qualities

        // name: '',
        // email: '',
        // profession: '',
        // sex: 'male',
        // qualities: []
    })

    useEffect(() => {
        if (!userLoading && !professionLoading && !qualityLoading) {
            setData(prevState => {
                return {
                    ...prevState,
                    ...initValue
                }
            })
            setFormLoad(false)
        // setData(initValue)
        }
    }, [userLoading, professionLoading, qualityLoading])

    const [isFormLoad, setFormLoad] = useState(true)

    const [errors, setErrors] = useState({})
    // const [isLoading, setIsLoading] = useState(true)

    // const history = useHistory()

    useEffect(() => {
        setErrors(validator(data, validatorConfig))
    }, [data])

    // useEffect(() => {
    //     // console.log('send request')
    //     api.professions.fetchAll().then((data) => setProfessions(data))
    //     api.qualities.fetchAll().then((data) => setQualities(data))
    // }, [])
    // useEffect(() => {
    //     setIsLoading(true)
    //     setData((prevState) => ({
    //         ...prevState,
    //         qualities: qualitiesList,
    //         profession: professions._id
    //     })
    //     )
    // api.users.getById(userId).then(({ profession, qualities, ...data }) => {
    // console.log('data', data)
    // console.log('profession', profession)
    // console.log('qualities', qualities)
    // setData((prevState) => ({
    //     ...prevState,
    //     ...data,
    //     qualities: transformData(qualitiesList),
    //     profession: profession._id
    // })
    // )
    // })
    // console.log('send request')
    // api.professions.fetchAll().then((data) => {
    // const professionList = Object.keys(data).map((professionName) => ({
    //     label: data[professionName].name,
    //     value: data[professionName]._id
    // }))
    // setProfessions(professionList)
    // })
    // api.qualities.fetchAll().then((data) => {
    //     const qualitiesList = Object.keys(data).map((qualitiesName) => ({
    //         label: data[qualitiesName].name,
    //         value: data[qualitiesName]._id,
    //         color: data[qualitiesName].color
    //     }))
    //     setQualities(qualitiesList)
    // })
    // }, [])

    // useEffect(() => {
    //     if (data._id) setIsLoading(false)
    // }, [data])

    // const transformData = (qualities) => {
    //     // console.log(qualities)
    //     return Object.keys(qualities).map((qualitiesName) => ({
    //         label: qualities[qualitiesName].name,
    //         value: qualities[qualitiesName]._id,
    //         color: qualities[qualitiesName].color
    //     }))
    // }

    // useEffect(() => {
    //     console.log(professions)
    // }, [professions])

    const validatorConfig = {
        name: {
            isRequired: {
                message: `имя не должно быть пустым!`
            }
        },
        email: {
            isRequired: {
                message: `email не должен быть пустым!`
            },
            isEmail: {
                message: `email введен некорректно!`
            }
        },
        profession: {
            isRequired: {
                message: `обязательно выберите свою профессию!`
            }
        }
    }

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleChange = (target) => {
        setData(prevState => {
            return {
                ...prevState,
                [target.name]: target.value
            }
        })
    }

    const isValid = Object.keys(errors).length === 0

    const handleSubmit = (e) => {
        // console.log(data)
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        const { qualities } = data

        // console.log({
        //     ...data,
        //     // profession: getProfessionById(profession),
        //     qualities: getQualities(qualities)
        // })

        const userData = {
            ...data,
            // profession: getProfessionById(profession),
            qualities: getQualities1(qualities)
        }

        // console.log(userData)
        // console.log(updateUserData)

        updateUserData1(currentUser._id, userData)

        // console.log(data)

        // api.users.update(userId, {
        //     ...data,
        //     profession: getProfessionById(profession),
        //     qualities: getQualities(qualities)
        // })
        //     .then((data) => {
        //         history.push(`/users/${data._id}`)
        //     })
        // history.push(`/users/${data._id}`)
        // history.push(`/users/${currentUser._id}`)
    }

    // async function updateUserData1(id, userData) {
    //     await updateUser(id, userData)
    // }
    function updateUserData1(id, userData) {
        dispatch(updateUserData(id, userData))
    }

    // const getProfessionById = (id) => {
    //     for (const prof of professions) {
    //         if (prof.value === id) {
    //             return { _id: prof.value, name: prof.label }
    //         }
    //     }
    // }

    // const getQualities = (elements) => {
    //     const qualitiesArray = []
    //     for (const elem of elements) {
    //         for (const quality in qualities) {
    //             if (elem.value === qualities[quality].value) {
    //                 qualitiesArray.push({
    //                     _id: qualities[quality].value,
    //                     name: qualities[quality].label,
    //                     color: qualities[quality].color
    //                 })
    //             }
    //         }
    //     }
    //     return qualitiesArray
    // }

    const getQualities1 = (elements) => {
        // console.log(elements)
        const qualitiesArray = []
        for (const elem of elements) {
            // console.log(elem.value)
            // for (const quality in qualities) {
            // if (elem.value === qualities[quality].value) {
            qualitiesArray.push(elem.value)
            // }
            // }
        }
        return qualitiesArray
    }

    // if (data) {
    // if (data.qualities && data.qualities.length > 0) {
    // if (data.qualities && !isLoading) {
    if (!isFormLoad) {
        return (
            <form onSubmit={handleSubmit}>
                <div className='mb-4'></div>
                <TextField
                    label='Name'
                    name='name'
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <TextField
                    label='Email'
                    // type='password'
                    name='email'
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <SelectField
                    onChange={handleChange}
                    defaultOption='Choose...'
                    name='profession'
                    options={professions}
                    label='Выберите Вашу профессию'
                    error={errors.profession}
                    value={data.profession}
                />
                <RadioField
                    options={[
                        { name: 'Male', value: 'male' },
                        { name: 'FeMale', value: 'female' }
                    ]}
                    value={data.sex}
                    name='sex'
                    onChange={handleChange}
                    label='Выберите Ваш пол'
                />
                <MultiSelectField
                    options={qualitiesList}
                    onChange={handleChange}
                    // defaultValue={transformData(currentUser.qualities)}
                    userQuality={data.qualities}
                    name='qualities'
                    label='Выберите Ваши качества'
                />
                <button
                    type='submit'
                    disabled={!isValid}
                    // disabled={true}
                    className='btn btn-primary w-100 mx-auto'
                >
                    Update
                </button>
            </form>
        )
    } else {
        return 'Loading...'
    }
}
// }

UserEditForm.propTypes = {
    userId: PropTypes.string.isRequired
}
export default UserEditForm
