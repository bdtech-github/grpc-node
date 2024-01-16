import { ServerErrorResponse, ServerUnaryCall, ServerWritableStream, StatusObject, sendUnaryData } from "@grpc/grpc-js";
import { IDockServiceHandlers } from "../proto/DriveYourCity/IDockService";
import { DockResponse } from "../proto/DriveYourCity/DockResponse";
import { GetAllDocks__Output } from "../proto/DriveYourCity/GetAllDocks";
import { GetDockByIdRequest, GetDockByIdRequest__Output } from "../proto/DriveYourCity/GetDockByIdRequest";
import { InMemoryDockPersistence } from "../persitence/InMemoryDockPersistence";
import { Status } from "@grpc/grpc-js/build/src/constants";
import { CreateDockRequest, CreateDockRequest__Output } from "../proto/DriveYourCity/CreateDockRequest";

const dockPersistence = new InMemoryDockPersistence();
const DockService: IDockServiceHandlers = {
    CreateDock: function (call: ServerUnaryCall<CreateDockRequest__Output, DockResponse>, callback: sendUnaryData<DockResponse>): void {
        const request = call.request as CreateDockRequest;
        if(request.dock) {
            const dock = request.dock;
            dockPersistence.createDock(dock);
            callback(null, { dock });
        }
    },
    GetAllDocks: function (call: ServerWritableStream<GetAllDocks__Output, DockResponse>): void {
        const docks = dockPersistence.getAllDocks();
        docks.forEach(dock => call.write({ dock }));
        call.end();
    },
    GetDockById: function (call: ServerUnaryCall<GetDockByIdRequest__Output, DockResponse>, callback: sendUnaryData<DockResponse>): void {
        const request = call.request as GetDockByIdRequest;
        if (request.dockId) {
            const dockId = request.dockId;
            const dock = dockPersistence.getDockById(dockId);
            const error = dock === undefined ? { code: Status.NOT_FOUND, message: `dock with id ${dockId} not found` } : null;
            callback(error, { dock });
        }
        callback({
            name: "dockId missing",
            message: "Invalid input"
        }, { dock: undefined });
    }
}

export {
    DockService
}