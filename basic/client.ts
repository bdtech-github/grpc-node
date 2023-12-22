// @ts-ignore
import path from "path";
import * as fs from 'fs';
import * as protoLoader from "@grpc/proto-loader";
import * as grpc from "@grpc/grpc-js";
import {ProtoGrpcType} from "./proto/employees";
import {Employee} from "./proto/employees/Employee";
import {Empty} from "google-protobuf/google/protobuf/empty_pb";
import {SSLService} from "./src/SSLService";

const PORT = 8082
const PROTO_FILE = './proto/employees.proto'

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE))
const grpcObj = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType

const channelCredentials = grpc.credentials.createInsecure();
const client = new grpcObj.employees.IEmployeeService(
    `0.0.0.0:${PORT}`, channelCredentials
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

const getEmployeeByBadgeNumber = () => {
    console.log('############### getEmployeeByBadgeNumber')
    client.getByBadgeNumber({badgeNumber: 2080}, (err, response) => {
        if (err) {
            console.error(err);
        }
        console.log(`Employee with badge number ${response?.employee?.badgeNumber} has id ${response?.employee?.id}`);
    })
}

const saveEmployee = () => {
    console.log('############### saveEmployee')
    const employee: Employee = {
        id: 1000,
        badgeNumber: 1080,
        firstName: 'Diego',
    }
    client.save({employee}, (err, response) => {
        if (err) {
            console.error(err);
        }
        console.log(`Employee with id ${response?.employee?.id} saved`);
    })
}

const getAllEmployees = () => {
    console.log('############### getAllEmployees')
    const stream = client.getAll(new Empty());
    const employees: Employee[] = [];
    stream.on("data", (response) => {
        const employee = response.employee;
        employees.push(employee);
        console.log(`Fetched employee with badge number ${employee.badgeNumber}`);

    });
    stream.on("error", (err) => console.log('error'));
    stream.on("end", () => console.log(`${employees.length} employees saved`));
}



function onClientReady() {
    saveEmployee();
    getEmployeeByBadgeNumber();
    getAllEmployees();    
    getAllEmployees();
}
