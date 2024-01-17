import { ServerErrorResponse, ServerUnaryCall, ServerWritableStream, StatusObject, sendUnaryData } from "@grpc/grpc-js";
import { IDockServiceHandlers } from "../proto/DriveYourCity/IDockService";
import { DockResponse } from "../proto/DriveYourCity/DockResponse";
import { GetAllDocks__Output } from "../proto/DriveYourCity/GetAllDocks";
import { GetDockByIdRequest, GetDockByIdRequest__Output } from "../proto/DriveYourCity/GetDockByIdRequest";
import { InMemoryDockPersistence } from "../persitence/InMemoryDockPersistence";
import { Status } from "@grpc/grpc-js/build/src/constants";
import { CreateDockRequest, CreateDockRequest__Output } from "../proto/DriveYourCity/CreateDockRequest";
import { CockroachDBDockPersistence } from "../persitence/CockroachDBDockPersistence";
import { IsDockAvailableRequest__Output } from "../proto/DriveYourCity/IsDockAvailableRequest";
import { IsDockAvailableResponse } from "../proto/DriveYourCity/IsDockAvailableResponse";

const dockPersistence = new CockroachDBDockPersistence();
//const dockPersistence = new InMemoryDockPersistence();
const DockService: IDockServiceHandlers = {
    CreateDock: async (call: ServerUnaryCall<CreateDockRequest__Output, DockResponse>, callback: sendUnaryData<DockResponse>): Promise<void> => {
        const request = call.request as CreateDockRequest;
        if (request.dock) {
            const dock = request.dock;
            const newDock = await dockPersistence.createDock(dock);
            callback(null, { dock: newDock });
        }
    },
    GetAllDocks: async (call: ServerWritableStream<GetAllDocks__Output, DockResponse>): Promise<void> => {
        const docks = await dockPersistence.getAllDocks();
        docks.forEach(dock => call.write({ dock }));
        call.end();
    },
    GetDockById: async (call: ServerUnaryCall<GetDockByIdRequest__Output, DockResponse>, callback: sendUnaryData<DockResponse>): Promise<void> => {
        const request = call.request as GetDockByIdRequest;
        if (request.dockId) {
            const dockId = request.dockId;
            const dock = await dockPersistence.getDockById(dockId);
            const error = dock ? null : { code: Status.NOT_FOUND, message: `dock with id ${dockId} not found` };
            callback(error, { dock });
        }
        callback({
            name: "dockId missing",
            message: "Invalid input"
        }, { dock: undefined });
    },
    IsDockAvailable: function (call: ServerUnaryCall<IsDockAvailableRequest__Output, IsDockAvailableResponse>, callback: sendUnaryData<IsDockAvailableResponse>): void {
        throw new Error("Function not implemented.");
    }
}

export {
    DockService
}