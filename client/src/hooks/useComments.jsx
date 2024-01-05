import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
// import { useAuth } from './useAuth'
import { nanoid } from 'nanoid'
import { useParams } from 'react-router-dom'
import commentService from '../services/comment.service'
import { useSelector } from 'react-redux'
import { getCurrentUserId } from '../store/users'

const CommentsContext = React.createContext()

export const useComments = () => {
    return useContext(CommentsContext)
}
export const CommentsProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true)
    const [comments, setComments] = useState([])
    const [error, setError] = useState(null)

    const { userId } = useParams()
    // const { currentUser } = useAuth()
    const currentUserId = useSelector(getCurrentUserId())

    // const userId = useParams()

    useEffect(() => {
        // setComments(null)
        // setLoading(false)
        getComments()
    }, [userId])

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    async function createComment(data) {
        // console.log(data)
        // console.log(userId)
        const comment = {
            ...data,
            created_at: Date.now(),
            pageId: userId,
            userId: currentUserId,
            _id: nanoid()
        }
        // console.log(comment)
        try {
            const { content } = await commentService.createComment(comment)
            setComments(prevState => [...prevState, content])
            // console.log(content)
        } catch (error) {
            errorCatcher(error)
        }
    }

    async function getComments() {
        try {
            const { content } = await commentService.getComments(userId)
            setComments(content)
            // console.log(content)
        } catch (error) {
            errorCatcher(error)
        } finally {
            setLoading(false)
        }
    }

    async function removeComment(id) {
        try {
            const { content } = await commentService.removeComment(id)
            // setComments(content)
            // console.log(content)
            if (content === null) {
                setComments(prevState => prevState.filter((comment) => {
                    return comment._id !== id
                }))
            }
        } catch (error) {
            errorCatcher(error)
        }
        // } finally {
        //     setLoading(false)
        // }
    }

    function errorCatcher(error) {
        // console.log('My error', error)
        const { message } = error.response.data
        setError(message)
    }

    return (
        <CommentsContext.Provider value={ { comments, createComment, getComments, removeComment, isLoading } }>
            {children}
        </CommentsContext.Provider>
    )
}

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}
