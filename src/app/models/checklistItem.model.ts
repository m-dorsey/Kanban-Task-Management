
export class ChecklistItem{
    
    public isComplete: boolean;

    constructor(public name: string) {
        this.isComplete = false;
    }

    toggleComplete() {

        if (this.isComplete) {
            this.isComplete = false;
        } else {
            this.isComplete = true;
        }
    }

}