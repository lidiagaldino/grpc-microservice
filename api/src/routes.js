const { Router } = require('express')
const UserController = require('./controller/UserController')
const SessionController = require('./controller/SessionController')

const router = Router()

router.get('/users/:id', UserController.show)
router.post('/users', UserController.store)
router.post('/sessions', SessionController.store)

module.exports = router