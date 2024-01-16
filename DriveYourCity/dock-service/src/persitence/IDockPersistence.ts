import { Dock } from "../proto/DriveYourCity/Dock";

export interface IDockPersistence {
    createDock(dock: Dock): Promise<Dock>;
    getAllDocks(): Promise<Dock[]>
    getDockById(id:number): Promise<Dock | undefined>
}