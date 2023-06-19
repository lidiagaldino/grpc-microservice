const userClient = require("../services/userService")

class UserController {
    async show(req, res) {
        const user = {}

        return user
    }

    async store(req, res) {
        const { email, username, password } = req.body

        userClient.registerUser({ user: { email, password, username } }, function (err, response) {
            if (err) console.log(err);
            else console.log(response);
        })

        return res.send('teste')
    }
}

module.exports = new UserController