import { Dock } from "../proto/DriveYourCity/Dock";
import { IDockPersistence } from "./IDockPersistence";


export class InMemoryDockPersistence implements IDockPersistence {
    private _docks: Dock[]
    constructor () {
        this._docks = [];
    }
    createDock(dock: Dock): Dock {
        this._docks.push(dock);
        return dock;    
    }

    getAllDocks(): Dock[] {
        return this._docks;
    }

    getDockById(id: number): Dock | undefined {
        return this._docks.find(d => d.id === id);
    }
    
}