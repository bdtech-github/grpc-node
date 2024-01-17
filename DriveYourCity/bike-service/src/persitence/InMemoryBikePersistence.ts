import { Bike } from "../proto/DriveYourCity/Bike";
import { IBikePersistence } from "./IBikePersistence";


export class InMemoryBikePersistence implements IBikePersistence {
    private _bikes: Bike[]
    constructor () {
        this._bikes = [];
    }
    
    createBike(dock: Bike): Promise<Bike> {
        return new Promise((resolve, reject) => {
            this._bikes.push(dock);
            resolve(dock);
        });   
    }

    getAllBikes(): Promise<Bike[]> {
        return new Promise((resolve, reject) => {
            resolve(this._bikes);
        });
    }

    getBikeById(id: number): Promise<Bike | undefined> {
        return new Promise((resolve, reject) => {            
            resolve(this._bikes.find(d => d.id === id));
        });        
    }
    
    async updateBike(id: number, bike: Bike): Promise<Bike | undefined> {        
        return new Promise((resolve, reject) => {            
            const bikeIndex = this._bikes.findIndex(d => d.id === id);

            if(bikeIndex !== -1) {
                this._bikes[bikeIndex] = bike;
                resolve(this._bikes[bikeIndex]);
            }            

            resolve(undefined);
        })
    }
}