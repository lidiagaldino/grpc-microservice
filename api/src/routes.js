const { Router } = require('express')
const UserController = require('./controller/UserController')
const SessionController = require('./controller/SessionController')
const PurchaseController = require('./controller/PurchaseController')

const authMiddleware = require('./middlewares/auth')

const router = Router()

router.get('/users/:id', UserController.show)
router.post('/users', UserController.store)
router.post('/sessions', SessionController.store)

router.get('/purchases/:id', authMiddleware, PurchaseController.show)
router.post('/purchases', authMiddleware, PurchaseController.store)
router.get('/purchases', authMiddleware, PurchaseController.index)
module.exports = router