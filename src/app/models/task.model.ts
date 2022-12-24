
export class Task {
    public description: string;

    constructor(public name: string) {
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