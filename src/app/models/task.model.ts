
import { Label } from './label.model'

export class Task {

    public description: string;
    public labels: Label[];

    constructor(public name: string) {
        this.description = "";
        this.labels = [];
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
}