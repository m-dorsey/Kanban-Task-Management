
import { Label } from './label.model'
import { Checklist } from './checklist.model';

export class Task {

    public description: string;
    public labels: Label[];
    public checklists: Checklist[];

    constructor(public name: string) {
        this.description = "";
        this.labels = [];
        this.checklists = []
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

    addLabel(str: string) {
        this.labels.push(
            new Label(str)
        );
    }

    addChecklist(str: string) {
        this.checklists.push(
            new Checklist(str)
        );
    }
}