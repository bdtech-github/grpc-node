import { ServerDuplexStream, ServerUnaryCall, ServerWritableStream, sendUnaryData } from "@grpc/grpc-js";
import { IRideServiceHandlers } from "../proto/DriveYourCity/IRideService";
import { CockroachDBRidePersistence } from "../persitence/RidePersistence";
import { EndRideRequest__Output } from "../proto/DriveYourCity/EndRideRequest";
import { EndRideResponse } from "../proto/DriveYourCity/EndRideResponse";
import { RideResponse } from "../proto/DriveYourCity/RideResponse";
import { StartRideRequest__Output } from "../proto/DriveYourCity/StartRideRequest";
import { UpdateRideRequest, UpdateRideRequest__Output } from "../proto/DriveYourCity/UpdateRideRequest";
import { bikeClient } from "./BikeClient";
import { Ride } from "../proto/DriveYourCity/Ride";
import { dockClient } from "./DockClient";
import { InternalError, InvalidArgumentError, NotFoundError } from "../utils/gRPC";

const ridePersistence = new CockroachDBRidePersistence();

class RideService implements IRideServiceHandlers {
    [name: string]: import("@grpc/grpc-js").UntypedHandleCall;

    async StartRide(call: ServerUnaryCall<StartRideRequest__Output, RideResponse>, callback: sendUnaryData<RideResponse>): Promise<void> {
        try {
            
            const bikeId = call.request.bikeId;            
            if(bikeId) {
                let bike = await bikeClient.getBikeById(bikeId);                     
                const ride: Ride = {          
                    bike,          
                    originDock: bike.dock
                }                 
                await bikeClient.unAttachBikeFromDock(bikeId);
                const newRide = await ridePersistence.createRide(ride);                                              
                callback(null, { ride: newRide });
            }
            callback(InvalidArgumentError(['bikeId']), { ride: undefined });
        } catch (err) {
            console.log(err)
            callback(InternalError(err as string), { ride: undefined });
        }
    }

    async UpdateRide(call: ServerDuplexStream<UpdateRideRequest__Output, RideResponse>): Promise<void> {
        call.on('data', async (request: UpdateRideRequest) => {
            const newKms = request.newKms!;
            const rideId = request.rideId!;

            const ride = await ridePersistence.getRideById(rideId);
            if (ride) {
                const updatedRide = await ridePersistence.updateRide(rideId, { km: ride.km! + newKms });
                call.write({ride: updatedRide});
            } else {
                call.end();
            }            
        });

        call.on('end', () => {
            call.end();
        });
    }

    async EndRide(call: ServerWritableStream<EndRideRequest__Output, EndRideResponse>): Promise<void> {
        try {
            const rideId = call.request.rideId;
            const dockId = call.request.dockId;
    
            if(rideId && dockId) {
                const ride = await ridePersistence.getRideById(rideId);
            
                if(ride && ride.originDock) {
                    const isDockAvailable = await dockClient.isDockAvailable(ride.originDock.id!);            
                    if(isDockAvailable) {
                        const updatedRide = await ridePersistence.updateRide(rideId, { targetDock: { id: dockId } });
                        const updatedBike = await bikeClient.attachBikeToDock(ride.bike?.id!, ride.km!);

                        const informData = [
                            `ride with id: ${updatedRide.id} finished`,
                            `origin dock = ${updatedRide.originDock?.id}`,
                            `target dock = ${updatedRide.targetDock?.id}`,                            
                            `Total Kms = ${updatedRide.km}`,
                            `bike with id ${updatedBike.id} and new total Kms ${updatedBike?.totalKm}`,
                        ]

                        informData.forEach(info => call.write({info}));
                    } 
                    throw new Error(`dock with id ${ride.originDock.id} is not available for handle more bikes.`)
                }
            }
        } catch (err) {
            //callback(InternalError(err as string), { ride: undefined });
        }        
    }
}

export {
    RideService
}