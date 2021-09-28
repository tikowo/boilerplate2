const makeAuthController = ({ Controller, User, AuthService }) => {
    return Controller({
        async login(req, res, next) {
            const { email, password } = req.body;
            const user = await User.query().where('email', email).first();

            if(user && (await AuthService.compare(password, user.password))) {
                user.token = AuthService.signJwt(user.toJSON(), {expiresIn: '1d'})
                return res.status(200).json(user);
            }

            res.status(400).json({message: "Not authorized"});
        },
        async register(req, res, next) {
            const { name, email, password } = req.body;
            const oldUser = await User.query().where('email', email).first();

            if(oldUser) {
                return res.status(409).json({
                    error: 'User already exists'
                })
            }

            const encryptedPassword = await AuthService.hash(password);

            const user = await User.query().insert({
                name,
                email,
                password: encryptedPassword
            });

            user.token = AuthService.signJwt(user.toJSON());

            return res.status(201).json(user);
        },
        async me(req, res, next) {
            const user = await req.auth().withGraphFetched('[markets.[products.[attributes.[option, attribute]]]]');
            return res.json(user);
        }
    })
}

module.exports = makeAuthController;