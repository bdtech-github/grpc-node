import {EmployeeServiceHandlers} from "../proto/employees/EmployeeService";
import {
    sendUnaryData,
    ServerDuplexStream,
    ServerReadableStream,
    ServerUnaryCall,
    ServerWritableStream,
    UntypedHandleCall
} from "@grpc/grpc-js";
import {AddPhotoRequest__Output} from "../proto/employees/AddPhotoRequest";
import {AddPhotoResponse} from "../proto/employees/AddPhotoResponse";
import {GetAllRequest__Output} from "../proto/employees/GetAllRequest";
import {EmployeeRequest, EmployeeRequest__Output} from "../proto/employees/EmployeeRequest";
import {EmployeeResponse} from "../proto/employees/EmployeeResponse";
import {GetByBadgeNumberRequest, GetByBadgeNumberRequest__Output} from "../proto/employees/GetByBadgeNumberRequest";
import {EmployeesDB} from "./EmployeesDB";

const _employeesDB = new EmployeesDB();

const EmployeeService: EmployeeServiceHandlers = {

    AddPhoto(call: ServerReadableStream<AddPhotoRequest__Output, AddPhotoResponse>, callback: sendUnaryData<AddPhotoResponse>): void {
    },

    GetAll(call: ServerWritableStream<GetAllRequest__Output, EmployeeResponse>): void {
        const employees = _employeesDB.getAllEmployees();
        employees.forEach(employee => {
            call.write({ employee });
        });
        call.end();
    },

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

    SaveAll(call: ServerDuplexStream<EmployeeRequest__Output, EmployeeResponse>): void {
        call.on("data", (request:  EmployeeRequest) => {

            if(request.employee) {
                const employee = request.employee;
                _employeesDB.saveEmployee(employee);
                call.write({ employee });
            }
        });

        call.on("end", () => {
            call.end();
        });
    },
}

export {
    EmployeeService,
}
