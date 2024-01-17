import { ServerUnaryCall, ServerWritableStream, sendUnaryData } from "@grpc/grpc-js";
import { Status } from "@grpc/grpc-js/build/src/constants";
import { IBikeServiceHandlers } from "../proto/DriveYourCity/IBikeService";
import { BikeRequest, BikeRequest__Output } from "../proto/DriveYourCity/BikeRequest";
import { BikeResponse } from "../proto/DriveYourCity/BikeResponse";
import { GetBikeByIdRequest, GetBikeByIdRequest__Output } from "../proto/DriveYourCity/GetBikeByIdRequest";
import { AttachBikeToDockRequest__Output } from "../proto/DriveYourCity/AttachBikeToDockRequest";
import { InMemoryBikePersistence } from "../persitence/InMemoryBikePersistence";
import { IDockService, DockService } from "./DockService";

//const bikePersistence = new CockroachDBBikePersistence();
const bikePersistence = new InMemoryBikePersistence();
const dockService: IDockService = new DockService();
const BikeService: IBikeServiceHandlers = {
    AttachBikeToDock: async (call: ServerUnaryCall<AttachBikeToDockRequest__Output, BikeResponse>, callback: sendUnaryData<BikeResponse>): Promise<void> => {
        const bikeId = call.request.bikeId;
        const dockId = call.request.dockId;

        if(bikeId && dockId) {
            const dock = await dockService.getDockById(dockId);
            const bike = await bikePersistence.getBikeById(bikeId);

            await bikePersistence.updateBike(bikeId, bike);
        } 
        callback({
            name: "bikeId or dockId missing",
            message: "Invalid input"
        }, { bike: undefined });
    },
    CreateBike: async (call: ServerUnaryCall<BikeRequest__Output, BikeResponse>, callback: sendUnaryData<BikeResponse>): Promise<void> => {
        const request = call.request as BikeRequest;
        if(request.bike) {
            const bike = request.bike;
            const newBike = await bikePersistence.createBike(bike);
            callback(null, { bike: newBike });
        }
    },
    GetBikeById: async (call: ServerUnaryCall<GetBikeByIdRequest__Output, BikeResponse>, callback: sendUnaryData<BikeResponse>): Promise<void> => {
        const request = call.request as GetBikeByIdRequest;
        if (request.bikeId) {
            const bikeId = request.bikeId;
            const bike = await bikePersistence.getBikeById(bikeId);
            const error = bike ? null : { code: Status.NOT_FOUND, message: `bike with id ${bike} not found` };
            callback(error, { bike });
        }
        callback({
            name: "bike missing",
            message: "Invalid input"
        }, { bike: undefined });
    }
}

export {
    BikeService
}