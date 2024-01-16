import { Dock } from "../proto/DriveYourCity/Dock";
import { IDockPersistence } from "./IDockPersistence";


export class InMemoryDockPersistence implements IDockPersistence {
    private _docks: Dock[]
    constructor () {
        this._docks = [];
    }
    createDock(dock: Dock): Promise<Dock> {
        return new Promise((resolve, reject) => {
            this._docks.push(dock);
            resolve(dock);
        });   
    }

    getAllDocks(): Promise<Dock[]> {
        return new Promise((resolve, reject) => {
            resolve(this._docks);
        });
    }

    getDockById(id: number): Promise<Dock | undefined> {
        return new Promise((resolve, reject) => {            
            resolve(this._docks.find(d => d.id === id));
        });        
    }
    
}