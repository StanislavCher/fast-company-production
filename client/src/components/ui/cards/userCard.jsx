import React from 'react'
import PropTypes from 'prop-types'
// import { useAuth } from '../../../hooks/useAuth'
import { useSelector } from 'react-redux'
import { getCurrentUserId } from '../../../store/users'

const UserCard = ({ handleClick, userName, userProfession, userRate, userImage, userId }) => {
    // const { currentUser } = useAuth()
    const currentUserId = useSelector(getCurrentUserId())
    return (
        <>
            {(currentUserId === userId) && (<button className="position-absolute top-0 end-0 btn btn-light btn-sm"
                onClick={ handleClick }
            >
                <i className="bi bi-gear"></i>
            </button>)}
            <div
                className="d-flex flex-column align-items-center text-center position-relative">
                <img
                    src={userImage}
                    // src={`https://avatars.dicebear.com/api/avataaars/${(
                    //     Math.random() + 1
                    // )
                    //     .toString(36)
                    //     .substring(7)}.svg`}
                    className="rounded-circle shadow-1-strong me-3"
                    alt="avatar"
                    width="65"
                    height="65"
                />
                <div className="mt-3">
                    <h4>{userName}</h4>
                    <p className="text-secondary mb-1">{userProfession}</p>
                    <div className="text-muted">
                        <i className="bi bi-caret-down-fill text-primary" role="button"></i>
                        <i className="bi bi-caret-up text-secondary" role="button"></i>
                        <span className="ms-2">{userRate}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

UserCard.propTypes = {
    handleClick: PropTypes.func,
    userName: PropTypes.string,
    userProfession: PropTypes.string,
    userRate: PropTypes.number,
    userImage: PropTypes.string,
    userId: PropTypes.string
}

export default UserCard
