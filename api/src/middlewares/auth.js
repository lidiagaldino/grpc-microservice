const UserService = require('../services/userService');

const { promisify } = require('util');

module.exports = async (req, res, next) => {
    try {
        const response = await new Promise((resolve, reject) => {
            UserService.authenticate({
                token: req.headers.authorization,
            }, (err, response) => {
                if (err) reject(err)
                else resolve(response)
            });
        })


        if (response.error) throw new Error(response.error);

        req.userId = response.user.id;

        next();
    } catch ({ message }) {
        return res.status(401).json({ message });
    }
};