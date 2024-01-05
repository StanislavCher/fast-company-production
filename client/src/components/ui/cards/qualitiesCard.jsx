import React from 'react'
import PropTypes from 'prop-types'
import Qualities from '../qualities'

const QualitiesCard = ({ userQualities }) => {
    return (
        <div className="d-flex flex-column justify-content-center text-center">
            <h5 className="card-title">
                <span>Qualities</span>
            </h5>
            <p className="card-text">
                <Qualities qualities={userQualities} />
            </p>
        </div>
    )
}

QualitiesCard.propTypes = {
    userQualities: PropTypes.array
}

export default QualitiesCard
