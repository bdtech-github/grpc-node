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
import {EmployeeRequest__Output} from "../proto/employees/EmployeeRequest";
import {EmployeeResponse} from "../proto/employees/EmployeeResponse";
import {GetByBadgeNumberRequest__Output} from "../proto/employees/GetByBadgeNumberRequest";

export class EmployeeService implements EmployeeServiceHandlers {
    [name: string]: UntypedHandleCall;

    AddPhoto(call: ServerReadableStream<AddPhotoRequest__Output, AddPhotoResponse>, callback: sendUnaryData<AddPhotoResponse>): void {
    }

    GetAll(call: ServerWritableStream<GetAllRequest__Output, EmployeeResponse>): void {
    }

    GetByBadgeNumber(call: ServerUnaryCall<GetByBadgeNumberRequest__Output, EmployeeResponse>, callback: sendUnaryData<EmployeeResponse>): void {
    }

    Save(call: ServerUnaryCall<EmployeeRequest__Output, EmployeeResponse>, callback: sendUnaryData<EmployeeResponse>): void {
        const employee = call.request.employee;
        callback(null, { employee });
    }

    SaveAll(call: ServerDuplexStream<EmployeeRequest__Output, EmployeeResponse>): void {
    }
}
