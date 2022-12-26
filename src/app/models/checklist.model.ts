
import { ChecklistItem } from "./checklistItem.model";

export class Checklist {

    public items: ChecklistItem[];
    public numComplete: number;

    constructor(public name: string) {
        this.items = [];
        this.numComplete = this.getNumCompleted();
    }

    addItem(str: string) {
        this.items.push (
            new ChecklistItem(str)
        );
    }

    deleteItem(item: ChecklistItem) {
        var index = this.items.indexOf(item);
        this.items.splice(index, 1);
    }

    getNumCompleted() {

        if (this.items.length < 1) {
            return 0;
        }

        var count = 0;
        for (let item of this.items) {
            if (item.isComplete) {
                count += 1;
            }
        }

        return count;

    }

}