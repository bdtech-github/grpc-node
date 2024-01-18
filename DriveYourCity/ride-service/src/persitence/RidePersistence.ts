import { Prisma } from '@prisma/client';
import { prisma } from '../utils/prisma';
import { Ride } from "../proto/DriveYourCity/Ride";

export interface IRidePersistence {
    createRide(ride: Ride): Promise<Ride>;
    getAllRides(): Promise<Ride[]>
    getRideById(id:number): Promise<Ride | undefined>
    updateRide(id: number, ride: Ride): Promise<Ride | undefined>
}

export class CockroachDBRidePersistence implements IRidePersistence {

    private _prisma;

    constructor() {
        this._prisma = prisma;
    }
    createRide(ride: Ride): Promise<Ride> {
        throw new Error('Method not implemented.');
    }
    getAllRides(): Promise<Ride[]> {
        throw new Error('Method not implemented.');
    }
    getRideById(id: number): Promise<Ride | undefined> {
        throw new Error('Method not implemented.');
    }
    updateRide(id: number, ride: Ride): Promise<Partial<Ride>> {
        throw new Error('Method not implemented.');
    }

}