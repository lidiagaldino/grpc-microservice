const grpc = require('grpc')
const loaderConfig = require('../config/proto')
const protoLoader = require('@grpc/proto-loader');
const path = require('path')

const purchaseDef = protoLoader.loadSync(
    path.resolve(__dirname, '..', 'pb', 'purchase.proto'),
    loaderConfig
);

const purchase = grpc.loadPackageDefinition(purchaseDef);

const PurchaseClient = new purchase.PurchaseService(
    'localhost:3335',
    grpc.credentials.createInsecure()
)

module.exports = PurchaseClient