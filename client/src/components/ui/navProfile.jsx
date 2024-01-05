import React, { useState } from 'react'
// import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getCurrentUserData, getCurrentUserId } from '../../store/users'

const NavProfile = () => {
    // const { currentUser } = useAuth()
    const currentUser = useSelector(getCurrentUserData())
    const currentUserId = useSelector(getCurrentUserId())
    const [isOpen, setOpen] = useState(false)
    const toggleMenu = () => {
        setOpen(prevState => !prevState)
    }
    // console.log('render user bar')
    // console.log(currentUserId)
    // console.log(currentUser)
    if (!currentUser) return 'Loading...'
    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">
                    {currentUser.name}
                </div>
                <img
                    src={currentUser.image}
                    alt="avatar"
                    width="40"
                    height="40"
                    className="img-responsive rounded-circle"
                />
            </div>
            <div className={'w-100 dropdown-menu' + (isOpen ? ' show' : '')}>
                <Link
                    to={`/users/${currentUserId}`}
                    className="dropdown-item"
                >
                    Profile
                </Link>
                <Link
                    to={'/logout'}
                    className="dropdown-item"
                >
                    Log Out
                </Link>
            </div>
        </div>
    )
}

export default NavProfile
