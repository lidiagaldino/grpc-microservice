const { purchase } = require('../../../purchase/src/implementations')
const PurchaseService = require('../services/purchaseService')

class PurchaseController {
    async store(req, res) {
        const { title, value } = req.body
        const { userId } = req

        const response = await new Promise((resolve, reject) => {
            PurchaseService.purchase({ purchase: { userId, title, value } }, (err, response) => {
                if (err) reject(err)
                else resolve(response)
            })
        })

        return res.json(response)

    }

    async show(req, res) {
        const { id } = req.params

        const response = await new Promise((resolve, reject) => {
            PurchaseService.getPurchaseById({ id }, (err, response) => {
                if (err) reject(err)
                else resolve(response)
            })
        })

        return res.json(response)
    }

    async index(req, res) {
        const { userId } = req

        const response = await new Promise((resolve, reject) => {
            PurchaseService.listPurchases({ userId }, (err, response) => {
                if (err) reject(err)
                else resolve(response)
            })
        })

        return res.json(response)
    }
}

module.exports = new PurchaseController()