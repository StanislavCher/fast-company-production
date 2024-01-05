import React, { useEffect, useState } from 'react'
import Pagination from '../../common/pagination'
import { paginate } from '../../../utils/paginate'
import PropTypes from 'prop-types'
import GroupList from '../../common/groupList'
// import api from '../../../api'
import SearchStatus from '../../ui/searchStatus'
import UsersTable from '../../ui/usersTable'
import _ from 'lodash'
import TextField from '../../common/form/textField'
// import { useUser } from '../../../hooks/useUsers'
// import { useProfession } from '../../../hooks/useProfession'
// import { useAuth } from '../../../hooks/useAuth'
import { useSelector } from 'react-redux'
import { getProfessions, getProfessionsLoadingStatus } from '../../../store/professions'
import { getCurrentUserId, getUsers } from '../../../store/users'

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    // const { currentUser } = useAuth()
    const currentUserId = useSelector(getCurrentUserId())
    // const { isLoading: professionsLoading, profession: professions } = useProfession()
    const professions = useSelector(getProfessions())
    const professionsLoading = useSelector(getProfessionsLoadingStatus())
    // const [professions, setProfessions] = useState(undefined)
    const [selectedProf, setSelectedProf] = useState(undefined)
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
    const [searchQuery, setSearchQuery] = useState('')

    // const [users, setUsers] = useState(undefined)
    // const { users } = useUser()
    const users = useSelector(getUsers())
    // console.log(users)

    // useEffect(() => {
    //     // console.log('send request')
    //     api.users.fetchAll().then((data) => setUsers(data))
    // }, [])

    const handleDelete = (userId) => {
        console.log(userId)
        // setUsers(users.filter((user) => user._id !== userId))
    }

    const handleToggleBookmark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark }
            }
            return user
        })
        // setUsers(newArray)
        console.log(newArray)
    }

    // useEffect(() => {
    //     // console.log('send request')
    //     api.professions.fetchAll().then((data) => setProfessions(data))
    // }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf, searchQuery])

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const handleProfessionSelect = (item) => {
        if (searchQuery !== '') setSearchQuery('')
        if (item === selectedProf) setSelectedProf(undefined)
        else setSelectedProf(item)
    }

    if (users) {
        // let selectedUsers
        //
        // if (!searchingUserName) {
        //     selectedUsers = selectedProf
        //         ? users.filter((user) => {
        //             return (
        //                 JSON.stringify(user.profession) ===
        //                 JSON.stringify(selectedProf)
        //             )
        //         })
        //         : users
        // } else {
        //     selectedUsers = users.filter(user => user.name.toLowerCase().includes(searchingUserName.toLowerCase()))
        // }
        function filterUsers(data) {
            const selectedUsers = searchQuery
                ? data.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
                : selectedProf
                    ? data.filter((user) => {
                        return (
                            JSON.stringify(user.profession) ===
                            JSON.stringify(selectedProf)
                        )
                    })
                    : data
            // return selectedUsers.filter((user) => user._id !== currentUser._id)
            return selectedUsers.filter((user) => user._id !== currentUserId)
        }
        const selectedUsers = filterUsers(users)

        const itemsCount = users ? selectedUsers.length : 0

        const pageSize = 8

        const sortedUsers = _.orderBy(selectedUsers, [sortBy.path], [sortBy.order])

        const usersCrop = paginate(sortedUsers, currentPage, pageSize)

        const handleClearFilter = () => {
            setSelectedProf(undefined)
        }

        const handleSort = (item) => {
            setSortBy(item)
        }

        // const handleUserSearch = ({ target }) => {
        const handleUserSearch = (target) => {
            // setSearchingUserName(prevState => prevState + target.value)
            // console.log('target', target)
            // console.log('target.value', target.value)
            // console.log('searchingUserName prefer', searchingUserName)
            setSearchQuery(target.value)
            setSelectedProf(undefined)
            // console.log('searchingUserName after', searchingUserName)
            // console.log(users)
            // console.log(users.filter(user => user.name.includes(target.value)))
            // setUsers(users.filter(user => user.name.includes(target.value)))
        }

        // const handleShowUser = () => {
        //
        // }

        return (
            <div className="d-flex m-2">
                {!professionsLoading && professions && (
                    <div className="d-flex flex-column m-2">
                        <GroupList
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                            selectedItem={selectedProf}
                        />
                        <button
                            className={'btn btn-secondary m-2'}
                            onClick={handleClearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column m-2">
                    <SearchStatus length={itemsCount}/>
                    <TextField
                        onChange={handleUserSearch}
                        type='search'
                        name='Search'
                        label=''
                        value={searchQuery}/>
                    {itemsCount > 0 && (
                        <UsersTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookmark={handleToggleBookmark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={itemsCount}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        )
    } else return 'loading...'
}
UsersListPage.propTypes = {
    users: PropTypes.array
}

export default UsersListPage
