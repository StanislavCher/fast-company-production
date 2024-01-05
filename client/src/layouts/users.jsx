import React, { useEffect } from 'react'
import UsersListPage from '../components/page/usersListPage'
// import { useParams, useLocation } from 'react-router-dom'
import { useParams, Redirect } from 'react-router-dom'
import UserPage from '../components/page/userPage'
import UserEditPage from '../components/page/userEditPage'
// import UserProvider from '../hooks/useUsers'
// import { useAuth } from '../hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUserId, getDataStatus, loadUsersList } from '../store/users'
import UsersLoader from '../components/ui/hoc/usersLoader'
// import PropTypes from 'prop-types'

const Users = () => {
    const { userId, edit } = useParams()
    // const { pathname } = useLocation()
    // console.log(userId)
    // console.log(pathname)
    // console.log(edit)
    // const { currentUser } = useAuth()
    const currentUserId = useSelector(getCurrentUserId())
    const dataStatus = useSelector(getDataStatus())
    const dispatch = useDispatch()
    useEffect(() => {
        if (!dataStatus) {
            dispatch(loadUsersList())
        }
    }, [])
    if (!dataStatus) return 'Loading...'
    return (
        <>
            {/* <h1>Users</h1>*/}

            {/* {userId*/}
            {/*    ? <UserPage userId={userId} />*/}
            {/*    : <UsersListPage />*/}
            {/* }*/}
            {/* <UserProvider>*/}
            <UsersLoader>
                {userId
                    // ? !pathname.includes('/edit')
                    ? edit
                        // ? (userId === currentUser._id)
                        ? (userId === currentUserId)
                            ? <UserEditPage userId={userId} />
                            // : <Redirect to={`/users/${currentUser._id}/edit`} />
                            : <Redirect to={`/users/${currentUserId}/edit`} />
                        : <UserPage userId={userId} />
                    : <UsersListPage />
                }
            </UsersLoader>
            {/* </UserProvider>*/}
        </>
    )
}

// Users.propTypes = {
//     location: PropTypes.string
// }

export default Users
