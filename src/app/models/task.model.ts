
import { Label } from './label.model'
import { Checklist } from './checklist.model';

export class Task {

    public description: string;
    public labels: Label[];
    public checklists: Checklist[];
    public checklistStatus: {
        complete: number,
        total: number,
        isCompleteColor: string
    };

    public date?: Date;
    public isComplete: boolean;

    constructor(public name: string) {
        this.description = "";
        this.labels = [];
        this.checklists = []
        this.checklistStatus = this.getChecklistStatus();
        this.isComplete = false;
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

    deleteLabel(label: Label) {
        var index = (this.labels.indexOf(label));
        this.labels.splice(index, 1);
    }

    addChecklist(str: string) {
        this.checklists.push(
            new Checklist(str)
        );
    }

    deleteChecklist(checklist: Checklist) {
        var index = (this.checklists.indexOf(checklist));
        this.checklists.splice(index, 1);
    }

    getChecklistStatus() {

        if (this.checklists.length < 1) {

            return { complete: 0, total: 0, isCompleteColor: 'none' };

        } else {

            var complete = 0;
            var total = 0;

            for(let checklist of this.checklists) {
                if (checklist.items.length > 0) {
                    complete += checklist.getNumCompleted();
                    total += checklist.items.length;
                }
            }

            return {
                complete: complete, 
                total: total, 
                isCompleteColor: (complete == total) ? '#4CBB17' : 'none'
            };

        }

    }

    hasDate() {
        if (this.date == undefined) {
            return false;
        }
        return true;
    }

    setDate(date: Date) {
        this.date = date;
    }

    getDate() {

        if (!this.hasDate()) {
            console.log("NO DATE");
            return;
        }

        return {
            year: <number>this.date?.getFullYear(),
            month: <number>this.date?.getMonth() + 1,
            date: <number>this.date?.getDate(),
            hour: <number>this.date?.getHours(),
            minute: <number>this.date?.getMinutes()
        }

    }

    removeDate() {
        this.date = undefined;
    }

    getDateString(type: string): string | undefined {

        if (this.date != undefined) {

            switch (type) {
                case 'short':

                    if (new Date().getFullYear() == this.date.getFullYear()) {

                        let sStr = (this.date?.toDateString().split(" "));
                        (sStr?.shift());
                        (sStr?.pop());
                        
                        return (`${sStr?.join(' ')}`);
                    } else {
                        return this.getDateString('medium');
                    }

                case 'medium':
                    let mStr = (this.date?.toDateString().split(" "));
                    (mStr?.shift());
                    let mYear = <string>(mStr?.pop());
                    return (`${mStr?.join(' ')}, ${mYear}`);

                case 'long':
                    
                    let lStr = (this.date?.toDateString().split(" "));
                    (lStr?.shift());
                    let lYear = <string>(lStr?.pop());
                    let lTime = (this.date?.toLocaleTimeString().split(" "));
                    let ampm = lTime?.pop();
                    let tStr = (lTime[0].split(":"));
                    tStr.pop();

                    if (new Date().getDate() == this.date.getDate()) {
                        return (`due today at ${tStr.join(":")} ${ampm}`);
                    } else if (new Date().getDate()+1 == this.date.getDate()) {
                        return (`due tomorrow at ${tStr.join(":")} ${ampm}`);
                    } else if (new Date().getDate()-1 == this.date.getDate()) {
                        return (`due yesterday at ${tStr.join(":")} ${ampm}`);
                    } else if (new Date().getFullYear() != this.date.getFullYear()) {
                        return (`${lStr?.join(' ')}, ${lYear} at ${tStr.join(":")} ${ampm}`);
                    } else {
                        return (`${lStr?.join(' ')} at ${tStr.join(":")} ${ampm}`);
                    }

                default:
                    return;

            }
                
        }

        return;

        
    }

    getDateStatus() {
        // console.log(new Date().getTime(), this.date?.getTime());

        if (this.isComplete) {
            return {
                type: 'complete',
                color: '#4CBB17' // green
            };
        }

        var curr = new Date();
        if (this.date != undefined) {

            if (curr.getTime() > this.date?.getTime()) {

                return {
                    type: 'overdue',
                    color: '#ff1111' // red
                };

            } else {

                var pastDue = (
                    new Date(
                        this.date?.getFullYear(), this.date?.getMonth(), this.date?.getDate() - 1
                    )
                );
                
                var almostDue = (
                    new Date(
                        this.date?.getFullYear(), this.date?.getMonth(), this.date?.getDate()+1
                    )
                );

                if ((curr.getTime() > pastDue.getTime() && curr.getTime() < almostDue.getTime())) {
                    
                    return {
                        type: 'due soon',
                        color: '#ffff11' // yellow
                    };

                }
                
                
            }
        }

        return {
            type: '',
            color: 'none' // no color
        };
    }

    completeTask() {

        if (!this.isComplete) {
            this.isComplete = true;
        } else {
            this.isComplete = false;
        }
        
    }

}