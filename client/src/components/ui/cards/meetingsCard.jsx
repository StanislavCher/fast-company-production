import React from 'react'
import PropTypes from 'prop-types'

const MeetingsCard = ({ userMeetings }) => {
    return (
        <div className="d-flex flex-column justify-content-center text-center">
            <h5 className="card-title">
                <span>Completed meetings</span>
            </h5>
            <h1 className="display-1">{userMeetings}</h1>
        </div>
    )
}

MeetingsCard.propTypes = {
    userMeetings: PropTypes.number
}

export default MeetingsCard
