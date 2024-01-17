import { Dock } from "../proto/DriveYourCity/Dock";

export interface IDockService {
    getDockById(dockId: number): Promise<Dock>;
}

export class DockService implements IDockService {
    async getDockById(dockId: number): Promise<Dock> {
        throw new Error("Method not implemented.");
    }

}