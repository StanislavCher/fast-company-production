import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const TableBody = ({ data, columns }) => {
    const renderComponent = (item, column) => {
        if (columns[column].component) {
            if (typeof columns[column].component === 'function') {
                return columns[column].component(item)
            }
            return columns[column].component
        }
        return _.get(item, columns[column].path)
    }

    return (
        <tbody>
            {data.map((item) => (
                <tr key={item._id}>
                    {Object.keys(columns).map((column) => (
                        <td key={column}>
                            {renderComponent(item, column)}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    )
}

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired
}

export default TableBody
