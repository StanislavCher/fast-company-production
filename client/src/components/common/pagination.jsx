import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
    const pageCount = Math.ceil(itemsCount / pageSize)
    if (pageCount === 1) return null // (<></>)
    const pages = _.range(1, pageCount + 1, 1)
    // console.log({pageCount}, {pages}, {currentPage}, {onPageChange})
    return (
        <div>
            <nav>
                <ul className="pagination m-4">
                    {/* <li className="page-item"><a className="page-link">Предыдущая</a></li> */}
                    {pages.map((page) => {
                        return (
                            <li
                                key={'page_' + page}
                                className={
                                    'page-item' +
                                    (page === currentPage ? ' active' : '')
                                }
                            >
                                <button
                                    className="page-link"
                                    onClick={() => onPageChange(page)}
                                >
                                    {page}
                                </button>
                            </li>
                        )
                    })}
                    {/* <li className="page-item"><a className="page-link">1</a></li> */}
                    {/* <li className="page-item"><a className="page-link">2</a></li> */}
                    {/* <li className="page-item"><a className="page-link">3</a></li> */}
                    {/* <li className="page-item"><a className="page-link">Следующая</a></li> */}
                </ul>
            </nav>
        </div>
    )
}
Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
}

export default Pagination
