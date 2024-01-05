function generateAuthError(message) {
    switch (message) {
    case 'INVALID_PASSWORD':
        return 'Email или пароль введены некорректно'
    case 'EMAIL_EXISTS':
        return 'Пользователь с таким Email уже существует'
    default:
        if (message.indexOf('TOO_MANY_ATTEMPTS_TRY_LATER') === 0) {
            return 'Слишком много попыток входа. Попробуйте позднее'
        }
    }
}

export default generateAuthError
