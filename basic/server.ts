// @ts-ignore
import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import {ProtoGrpcType} from './proto/employees'
import {EmployeeService} from "./src/EmployeeService";

const PORT = 8082
const PROTO_FILE = './proto/employees.proto'

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE))
const grpcObj = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType

function main() {
    const server = getServer()

    server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(),
        (err, port) => {
            if (err) {
                console.error(err)
                return
            }
            console.log(`Your server as started on port ${port}`)
            server.start()
        })
}

function getServer() {
    const server = new grpc.Server()
    server.addService(grpcObj.employees.IEmployeeService.service, new EmployeeService())

    return server
}

main()
