const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

require('./database')

const implementation = require('./implementations')

const packageDefinition = protoLoader.loadSync(
    path.resolve(__dirname, 'pb', 'messages.proto'),
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    }
);
const proto = grpc.loadPackageDefinition(packageDefinition);

console.log(proto);

const server = new grpc.Server()

server.addService(proto.UserService.service, implementation)
server.bind('0.0.0.0:3334', grpc.ServerCredentials.createInsecure())
server.start()