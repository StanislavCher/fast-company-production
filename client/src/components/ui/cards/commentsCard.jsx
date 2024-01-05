import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import createDate from '../../../utils/date'
// import { useComments } from '../../../hooks/useComments'
import Card from './card'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUserId } from '../../../store/users'
import { getComments, getCommentsLoadingStatus, loadCommentsList, removeComment } from '../../../store/comments'
import { useParams } from 'react-router-dom'
// import { useAuth } from '../../../hooks/useAuth'
// import api from "../../../api";

const CommentsCard = ({ user, users }) => {
    // console.log('users', users)
    // console.log('user', user)
    const { userId } = useParams()
    const dispatch = useDispatch()
    // const { removeComment } = useComments()
    const comments = useSelector(getComments())
    // const { currentUser } = useAuth()
    const currentUserId = useSelector(getCurrentUserId())
    // console.log('currentUser', currentUser)
    // console.log('comments', comments)
    // const commentsForUser = createComment(userId).then((data) => { userComments = data })
    // console.log(commentsForUser)
    // console.log(comments)
    useEffect(() => {
        dispatch(loadCommentsList(userId))
    }, [userId])

    const isLoading = useSelector(getCommentsLoadingStatus())

    const sortedComments = () => {
        // console.log([...userComments])
        return [...comments].sort((a, b) => { return Number(b.created_at) - Number(a.created_at) })
    }

    const handleDelClick = (e) => {
        // api.comments.remove(id).then(r => console.log(r))
        // history.push(history.location.pathname)
        // console.log(e)
        // console.log(e.target.parentElement.id)
        // console.log(e.target.name)
        // api.comments.remove(e.target.parentElement.id).then()
        // removeComment(e.target.parentElement.id)
        dispatch(removeComment(e.target.parentElement.id))
        // api.comments.fetchCommentsForUser(userId).then((data) => setComments(data))
    }
    if (isLoading) return 'Loading...'
    else {
        return (
            comments && (comments?.length > 0)
                ? <Card>
                    <h2>Comments</h2>
                    <hr/>
                    {/* //comments*/}
                    {sortedComments().map((comment) => {
                        return (
                            <div key={comment._id} className="bg-light card-body  mb-3">
                                <div className="row">
                                    <div className="col">
                                        <div className="d-flex flex-start ">
                                            <img
                                                src={users.find(user => user.value === comment.userId).image}
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
                                            <div className="flex-grow-1 flex-shrink-1">
                                                <div className="mb-4">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-1 ">
                                                            {/* //User Name*/}
                                                            {users.find(user => user.value === comment.userId).label || 'Unknown User'}
                                                            {/* {user.name}*/}
                                                            <span className="small">
                                                                {/* //Published Time*/}
                                                                {createDate(comment.created_at)}
                                                            </span>
                                                        </p>
                                                        {currentUserId === comment.userId && (<button
                                                            className="btn btn-sm text-primary d-flex align-items-center"
                                                            name={comment._id}
                                                            id={comment._id}
                                                            onClick={handleDelClick}>
                                                            <i className="bi bi-x-lg"></i>
                                                        </button>)}
                                                    </div>
                                                    <p className="small mb-0">
                                                        {/* //Comment content*/}
                                                        {comment.content}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                </Card>
                : ''
        )
    }
}

CommentsCard.propTypes = {
    userComments: PropTypes.array,
    handleDelClick: PropTypes.func,
    users: PropTypes.array,
    user: PropTypes.object,
    userId: PropTypes.string
}

export default CommentsCard
