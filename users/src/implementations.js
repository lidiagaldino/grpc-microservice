const User = require('./models/User')
const jwt = require('jsonwebtoken')

const { promisify } = require('util');
module.exports = {
    async getUserById(call, callback) {
        const { id } = call.request;

        const user = await User.findById(id)

        if (!user) {
            return callback({ error: 'user not found' })
        }

        return callback(null, { user: { ...user.toObject(), id: user._id, password: undefined } })

    },
    async registerUser(call, callback) {
        const { email, username, password } = call.request.user;

        const user = await User.create({ email, username, password })

        return callback(null, { user: { ...user.toObject(), id: user._id } })
    },
    async loginUser(call, callback) {
        const { email, password } = call.request.user

        const user = await User.findOne({ email })

        if (!user) {
            return callback({ error: "user not found" })
        }

        if (!await user.compareHash(password)) {
            return callback({ error: 'invalid password' })
        }

        return callback(null, {
            token: User.generateToken(user)
        })
    },

    async authenticate(call, callback) {
        const { token: fullToken } = call.request;

        //console.log(fullToken);
        if (!fullToken) {
            callback(null, { error: 'No token provided' });
        }

        const parts = fullToken.split(' ');

        if (!parts.length === 2) {
            return callback(null, { error: 'Token error' });
        }

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme)) {
            return callback(null, { error: 'Token malformatted' });
        }

        try {
            console.log(token);
            const decoded = await promisify(jwt.verify)(token, 'testando');

            const user = await User.findById(decoded.id);

            return callback(null, { user: { ...user.toObject(), id: user._id } });
        } catch (err) {
            console.log(err);
            return callback(null, { error: 'Token invalid' });
        }
    },
}