import { v4 as uuid } from "uuid";

import { Due } from "./due";
import { SecondDue } from "./second-due";
import { State } from "./state.enum";

export class Sale {
    total: number;
    description: string;
    due: Due;
    secondDue: SecondDue;
    reference: string;
    test: boolean;
    state: State;

    constructor(total: number, description: string) {
        const now = new Date();

        this.total = total;
        this.description = description;

        this.due = {
            day: now.getDate(),
            month: now.getMonth() + 1,
            year: now.getFullYear(),
        };
        this.secondDue = {
            days: 30,
            surcharge: (20 * total) / 100,
        };

        this.reference = uuid();
        this.test = true;
        this.state = State.waiting;
    }
}
