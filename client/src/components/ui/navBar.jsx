import React from 'react'
import { Link } from 'react-router-dom'
// import { useAuth } from '../../hooks/useAuth'
import NavProfile from './navProfile'
import { useSelector } from 'react-redux'
import { getIsLoggedIn } from '../../store/users'

const NavBar = () => {
    // const { currentUser } = useAuth()
    const isLoggedIn = useSelector(getIsLoggedIn())
    // console.log(isLoggedIn)
    return (
        <>
            <nav className="navbar bg-light mb-3">
                <div className="container-fluid">
                    <ul className="nav">
                        <li className="nav-item">
                            <Link className='nav-link' aria-current='page' to={ '/' } >Main</Link>
                        </li>
                        {/* {currentUser && (*/}
                        {isLoggedIn && (
                            <li className="nav-item">
                                <Link className='nav-link' aria-current='page' to={ '/users' } >Users</Link>
                            </li>
                        )}
                    </ul>
                    <div className="d-flex">
                        {/* {currentUser*/}
                        {isLoggedIn
                            ? (<NavProfile/>)
                            : (<Link className='nav-link' aria-current='page' to={ '/login' } >Login</Link>)
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar