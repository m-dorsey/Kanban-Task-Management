
import { Column } from "./column.model";

export class Board {

    public description: string;

    constructor(public name: string, public columns: Column[]) {
        this.description = "";
    }

    setDescription(str: string) {
        this.description = str;
    }

    hasDescription() {
        if (this.description != "") {
            return true;
        }
        return false;
    }
    
}