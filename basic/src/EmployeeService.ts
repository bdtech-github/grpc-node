import {EmployeeServiceHandlers} from "../proto/employees/EmployeeService";
import {
    sendUnaryData,
    ServerDuplexStream,
    ServerReadableStream,
    ServerUnaryCall,
    ServerWritableStream,
    UntypedHandleCall
} from "@grpc/grpc-js";
import {AddPhotoRequest, AddPhotoRequest__Output} from "../proto/employees/AddPhotoRequest";
import {AddPhotoResponse} from "../proto/employees/AddPhotoResponse";
import {GetAllRequest__Output} from "../proto/employees/GetAllRequest";
import {EmployeeRequest, EmployeeRequest__Output} from "../proto/employees/EmployeeRequest";
import {EmployeeResponse} from "../proto/employees/EmployeeResponse";
import {GetByBadgeNumberRequest, GetByBadgeNumberRequest__Output} from "../proto/employees/GetByBadgeNumberRequest";
import {EmployeesDB} from "./EmployeesDB";
import * as fs from 'fs';

const _employeesDB = new EmployeesDB();

const EmployeeService: EmployeeServiceHandlers = {

    GetByBadgeNumber(call: ServerUnaryCall<GetByBadgeNumberRequest__Output, EmployeeResponse>, callback: sendUnaryData<EmployeeResponse>): void {
        const request = call.request as GetByBadgeNumberRequest;

        if(request.badgeNumber) {
            const badgeNumber = request.badgeNumber;
            const employee = _employeesDB.getEmployeeByBadgeNumber(badgeNumber);
            callback(null, { employee });
        }
        callback({
            name: "badgeNumber Missing",
            message: "Invalid input",
        }, { employee: undefined });
    },

    Save(call: ServerUnaryCall<EmployeeRequest__Output, EmployeeResponse>, callback: sendUnaryData<EmployeeResponse>): void {
        const request = call.request as EmployeeRequest;

        if(request.employee) {
            const employee = request.employee;
            _employeesDB.saveEmployee(employee);
            callback(null, { employee });
        }

        callback({
            name: "Employee Missing",
            message: "Invalid input",
        }, null);

    },

    GetAll(call: ServerWritableStream<GetAllRequest__Output, EmployeeResponse>): void {
       
    },

    AddPhoto(call: ServerReadableStream<AddPhotoRequest__Output, AddPhotoResponse>, callback: sendUnaryData<AddPhotoResponse>): void {
      
    },

    SaveAll(call: ServerDuplexStream<EmployeeRequest__Output, EmployeeResponse>): void {
     
    },
}

export {
    EmployeeService,
}
