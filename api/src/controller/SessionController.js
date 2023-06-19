const UserService = require('../services/userService')
const { promisify } = require('util')

class SessionController {
    async store(req, res) {
        const { email, password } = req.body

        UserService.loginUser({ user: { email, password } }, (err, response) => {
            if (err) console.log(err);
            else console.log(response);
        })

        //return res.json(response)
    }
}

module.exports = new SessionController()