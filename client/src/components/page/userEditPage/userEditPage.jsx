import React from 'react'
import PropTypes from 'prop-types'
// import RegisterForm from "../../ui/registerForm";
// import LoginForm from "../../ui/loginForm";
import UserEditForm from '../../ui/userEditForm'
import { useHistory } from 'react-router-dom'
const UserEditPage = ({ userId }) => {
    // return (
    //     <h2>
    //         UserEditPage for userId = {userId}
    //     </h2>
    // )
    const history = useHistory()
    const handleClickBack = () => {
        // history.push(`/users/${userId}`)
        history.push(`/users/${userId}`)
    }
    return (
        <div className='container mt-5'>
            <button className="btn btn-primary position-absolute top-20 end-20" onClick={ handleClickBack }>
                <i className="bi bi-caret-left"></i>
               Назад
            </button>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {
                        <>
                            <UserEditForm
                                userId={userId}
                            />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

UserEditPage.propTypes = {
    userId: PropTypes.string.isRequired
}

export default UserEditPage
