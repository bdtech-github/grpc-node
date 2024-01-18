import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { Status } from "@grpc/grpc-js/build/src/constants";
import { IBikeServiceHandlers } from "../proto/DriveYourCity/IBikeService";
import { BikeRequest__Output } from "../proto/DriveYourCity/BikeRequest";
import { BikeResponse } from "../proto/DriveYourCity/BikeResponse";
import { GetBikeByIdRequest__Output } from "../proto/DriveYourCity/GetBikeByIdRequest";
import { AttachBikeToDockRequest__Output } from "../proto/DriveYourCity/AttachBikeToDockRequest";
import { CockroachDBBikePersistence } from "../persitence/BikePersistence";
import { dockClient } from "./DockClient";
import { InternalError, InvalidArgumentError, NotFoundError } from "../utils/gRPC";

const bikePersistence = new CockroachDBBikePersistence();
class BikeService implements IBikeServiceHandlers {
    [name: string]: import("@grpc/grpc-js").UntypedHandleCall;
    
    async AttachBikeToDock(call: ServerUnaryCall<AttachBikeToDockRequest__Output, BikeResponse>, callback: sendUnaryData<BikeResponse>): Promise<void> {
        try {
            const bikeId = call.request.bikeId;
            const dockId = call.request.dockId;
            const totalKm = call.request.totalKms;
    
            if(bikeId && dockId) {            
                const isDockAvailable = await dockClient.isDockAvailable(dockId);
                if(isDockAvailable) {                      
                    const bike = await bikePersistence.getBikeById(bikeId);
                    const updatedBike = await bikePersistence.updateBike(bikeId, { totalKm: bike?.totalKm! + totalKm!, dock: { id: dockId } });
                    callback(null, { bike: updatedBike });
                } else {
                    callback({ code: Status.FAILED_PRECONDITION, message: `dock with id ${dockId} not available` }, { bike: undefined });
                }
            } 
            callback(InvalidArgumentError(['dockId', 'bikeId']), { bike: undefined });
        } catch (err) {
            callback(InternalError(err), { bike: undefined });
        }        
    }
    
    async CreateBike(call: ServerUnaryCall<BikeRequest__Output, BikeResponse>, callback: sendUnaryData<BikeResponse>): Promise<void> {
        try {
            const bike = call.request.bike;
            if(bike) {
                const newBike = await bikePersistence.createBike(bike);
                callback(null, { bike: newBike });
            }
        } catch (err) {
            callback(InternalError(err), { bike: undefined });
        }         
    }

    async GetBikeById(call: ServerUnaryCall<GetBikeByIdRequest__Output, BikeResponse>, callback: sendUnaryData<BikeResponse>): Promise<void> {
        try {
            const bikeId = call.request.bikeId;
            if (bikeId) {            
                const bike = await bikePersistence.getBikeById(bikeId);
                const error = bike ? null : NotFoundError('bike', bikeId);
                callback(error, { bike });
            }
        callback(InvalidArgumentError(['dockId']), { bike: undefined });
        } catch (err) {
            callback(InternalError(err), { bike: undefined });
        }        
    }
}

export {
    BikeService
}