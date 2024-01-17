import { Prisma, Dock as PrismaDock } from '@prisma/client';
import { prisma } from '../utils/prisma';
import { Dock } from "../proto/DriveYourCity/Dock";
import { IDockPersistence } from "./IBikePersistence";

export class CockroachDBDockPersistence implements IDockPersistence {

    private _prisma;

    constructor() {
        this._prisma = prisma;
    }

    async createDock(dock: Dock): Promise<Dock> {
        const input: Prisma.DockCreateInput = dock as Prisma.DockCreateInput;
        const newDock = await this._prisma.dock.create({ data: input });
        return newDock;
        //throw new Error("Method not implemented.");
    }
    async getAllDocks(): Promise<Dock[]> {
        return this._prisma.dock.findMany();        
    }
    async getDockById(id: number): Promise<Dock | undefined> {
        const dock = await this._prisma.dock.findUnique({
            where: {
              id,
            },
          });
        return dock as Dock;
    }

}