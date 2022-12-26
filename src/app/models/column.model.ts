
import { Task } from "./task.model";

export class Column {

    constructor(public name: string, public tasks: Task[]) {
        
    }

    addTask() {
        this.tasks.push (
            new Task("New Task")
        );
    }

    deleteTask(task: Task) {
        var index = this.tasks.indexOf(task);
        this.tasks.splice(index, 1);
    }
}