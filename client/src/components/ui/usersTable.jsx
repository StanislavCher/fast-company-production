import React from 'react'
// import UserPage from './user'
import PropTypes from 'prop-types'
// import TableHeader from './tableHeader'
// import TableBody from './tableBody'
import Bookmark from '../common/bookmark'
import Qualities from './qualities'
import Table from '../common/table'
import { Link } from 'react-router-dom'
import Profession from './profession'

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookmark,
    // onDelete,
    ...rest
}) => {
    const columns = {
        name: {
            path: 'name',
            name: 'Имя',
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            path: 'qualities',
            name: 'Качества',
            component: (user) => (
                <Qualities qualities={user.qualities}/>
            )
        },
        // professions: { path: 'profession.name', name: 'Профессия' },
        professions: {
            name: 'Профессия',
            component: (user) => <Profession id={user.profession}/>
        },
        completedMeetings: {
            path: 'completedMeetings',
            name: 'Встретился, раз'
        },
        rate: { path: 'rate', name: 'Оценка' },
        bookmark: {
            path: 'bookmark',
            name: 'Избранное',
            component: (user) => (
                <Bookmark
                    status={user.bookmark}
                    onClick={() => {
                        onToggleBookmark(user._id)
                    }}
                />
            )
        }
        // ,
        // delete: {
        //     component: (user) => (
        //         <button
        //             className="btn btn-danger"
        //             onClick={() => onDelete(user._id)}
        //         >
        //         delete
        //         </button>
        //     )
        // }
    }

    return (
        <>
            <Table
                /* {...{ onSort, selectedSort, columns, data: users }}*/
                onSort={onSort}
                selectedSort={selectedSort}
                columns={columns}
                data={users}
            />

            {/* <Table>*/}
            {/*    <TableHeader*/}
            {/*        {...{ onSort, selectedSort, columns }}*/}
            {/*        // onSort={onSort}*/}
            {/*        // selectedSort={selectedSort}*/}
            {/*        // columns={columns}*/}
            {/*    />*/}
            {/*    <TableBody*/}
            {/*        { ...{ columns, data: users }}*/}
            {/*        // data={users}*/}
            {/*        // columns={columns}*/}
            {/*    />*/}
            {/* </Table>*/}

        </>
    )
}
UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookmark: PropTypes.func.isRequired
    // ,
    // onDelete: PropTypes.func.isRequired
}

export default UsersTable
