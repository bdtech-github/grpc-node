import { Dock } from "../proto/DriveYourCity/Dock";

export interface IDockPersistence {
    createDock(dock: Dock): Dock;
    getAllDocks(): Dock[]
    getDockById(id:number): Dock | undefined
}