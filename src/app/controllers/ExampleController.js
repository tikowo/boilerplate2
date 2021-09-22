const makeExampleController = ({ User, ElasticSearchClient }) => {
    return {
        async store(req, res, next) {
            // TODO
            try {
                await User.query().insert({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                res.status(201).send();
            } catch (e) {
                res.status(400).json(e);
            }
        },
        async index(req, res, next) {
            let user = await User.query().findById(req.middlewareBinding.user_id);
            res.status(200).json(user)
        },

        async findElastic(req, res, next) {
            if(config('elastic.enabled')) {
                try {
                    const { body } = await ElasticSearchClient.get({
                        index: `${config('elastic.prefix')}-users`,
                        id: req.middlewareBinding.user_id 
                    })
                    return res.status(200).json(body._source)
                } catch {
                    return res.status(404).send();
                }
                
            }
            return res.status(200).json({status: "please configure elasticsearch"})
        }
    }
}

module.exports = makeExampleController;