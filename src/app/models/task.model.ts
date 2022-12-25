
import { Label } from './label.model'
import { Checklist } from './checklist.model';

export class Task {

    public description: string;
    public labels: Label[];
    public checklists: Checklist[];
    public checklistStatus: {
        complete: number,
        total: number
    };

    constructor(public name: string) {
        this.description = "";
        this.labels = [];
        this.checklists = []
        this.checklistStatus = this.getChecklistStatus();
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

    getChecklistStatus() {

        if (this.checklists.length < 1) {

            return { complete: 0, total: 0 };

        } else {

            var complete = 0;
            var total = 0;

            for(let checklist of this.checklists) {
                if (checklist.items.length > 0) {
                    complete += checklist.getNumCompleted();
                    total += checklist.items.length;
                }
            }

            return {complete: complete, total: total};

        }

    }
}