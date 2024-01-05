export function paginate(userItems, currentPage, pageSize) {
    if (userItems) {
        return [...userItems].splice(pageSize * (currentPage - 1), pageSize)
    } else {
        return undefined
    }
}
