const getTrueMonth = (month) => {
    switch (month) {
    case '0':
        return 'january'
    case '1':
        return 'february'
    case '2':
        return 'march'
    case '3':
        return 'april'
    case '4':
        return 'may'
    case '5':
        return 'june'
    case '6':
        return 'july'
    case '7':
        return 'august'
    case '8':
        return 'september'
    case '9':
        return 'october'
    case '10':
        return 'november'
    case '11':
        return 'december'
    default:
        return 'unknown month'
    }
}

const createDate = (ms) => {
    // console.log(ms)
    // console.log(typeof ms)
    // let msNumber
    // console.log(new Date(Number(ms)))
    // (typeof ms === 'string') ? msNumber = new Date(ms) : msNumber = new Date(ms)
    const msNumber = new Date(ms)
    // console.log(msNumber)

    const deltaCommentTime = new Date() - msNumber
    // console.log(deltaCommentTime)

    if (deltaCommentTime < 60 * 1000) return ' - 1 минуту назад'
    else if (deltaCommentTime < 5 * 60 * 1000) return ' - 5 минут назад'
    else if (deltaCommentTime < 10 * 60 * 1000) return ' - 10 минут назад'
    else if (deltaCommentTime < 30 * 60 * 1000) return ' - 30 минут назад'
    else if (deltaCommentTime < 24 * 60 * 60 * 1000) {
        // console.log(msNumber)
        // console.log((new Date(msNumber)))
        // console.log((new Date(msNumber).getHours().toString()))
        return (
            ((msNumber.getHours().toString().length === 1)
                ? ' - 0'
                : ' - ') + msNumber.getHours().toString() +
            ':' +
            ((msNumber.getMinutes().toString().length === 1)
                ? '0'
                : '') + msNumber.getMinutes().toString()
        )
    } else if (deltaCommentTime < 31 * 24 * 60 * 60 * 1000) {
        return (
            ' - ' + msNumber.getDay().toString() +
            ' ' +
            getTrueMonth(msNumber.getMonth().toString())
        )
    } else if (deltaCommentTime < 366 * 31 * 24 * 60 * 60 * 1000) {
        return (
            ' - ' + msNumber.getDay().toString() +
            ' ' +
            getTrueMonth(msNumber.getMonth().toString()) +
            ' ' +
            msNumber.getFullYear().toString()
        )
    } else return ms
}

export default createDate
