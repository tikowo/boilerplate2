const makeAuthMiddleware = ({ User, AuthService }) => {
    return (req, res, next) => {
        const token = req.query.token || req.headers['x-access-token'];

        try {
            const { id } = AuthService.verifyJwt(token);

            req.auth = () => {
                return User.query().findById(id);
            };
        } catch(e) {
            return res.status(401).json({
                error: 'Unauthenticated'
            });
        }

        return next();
    }
}

module.exports = makeAuthMiddleware;