import React from 'react'
import PropTypes from 'prop-types'

const Card = ({ children }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}

Card.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
}

export default Card
