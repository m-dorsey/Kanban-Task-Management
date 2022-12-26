
import { Column } from "./column.model";

export class Board {

    public description: string;

    constructor(public name: string, public columns: Column[]) {
        this.description = "";
    }

    addColumn() {
        this.columns.push(
            new Column('New List', [])
        );
    }

    deleteColumn(column: Column) {
        var index = this.columns.indexOf(column);
        this.columns.splice(index, 1);
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

    clearDescription() {
        this.description = "";
    }
    
}