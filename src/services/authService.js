const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = function makeAuthService({}) {
    const jwtSecret = config('jwt.secret');

    return {
        signJwt(payload, options) {
            return jwt.sign(
                payload,
                jwtSecret,
                {
                    ...options
                }
            )
        },
        verifyJwt(token) {
            return jwt.verify(token, jwtSecret);
        },
        async compare(password, hash) {
            return await bcrypt.compare(password, hash)
        },
        async hash(password, salt = 10) {
            return await bcrypt.hash(password, salt);
        }
    }
}