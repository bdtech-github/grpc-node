// @ts-ignore
import path from "path";
import * as protoLoader from "@grpc/proto-loader";
import * as grpc from "@grpc/grpc-js";
import {ProtoGrpcType} from "./proto/employees";
import {Employee} from "./proto/employees/Employee";

const PORT = 8082
const PROTO_FILE = './proto/employees.proto'

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE))
const grpcObj = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType

const client = new grpcObj.employees.IEmployeeService(
    `0.0.0.0:${PORT}`, grpc.credentials.createInsecure()
)

const deadline = new Date()
deadline.setSeconds(deadline.getSeconds() + 5)
client.waitForReady(deadline, (err) => {
    if (err) {
        console.error(err)
        return
    }
    onClientReady()
})

function onClientReady() {
    const employee: Employee = {
        firstName: 'Diego'
    }
    console.log('sending')
    client.save({ employee }, (err, response) => {
        if(err) {
            console.error(err);
        }
        console.log(response);
    })
}
