const tokenService = require('../services/token.service')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        // Bearer dfgsdfgsdgawrwc43bm6d7r6msm6s2w43
        const token = req.headers.authorization.split(' ')[1]
        // console.log(token)
        if (!token) {
            return res.status(401).json({message: 'Unauthorized'})
        }

        const data = tokenService.validateAccess(token)

        if (!data) {
            return res.status(401).json({message: 'Unauthorized'})
        }

        req.user = data

        // console.log('Decoded', data)

        next()
    } catch (e) {
        res.status(401).json({message: 'Unauthorized'})
    }
}