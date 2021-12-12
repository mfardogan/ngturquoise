import Choice from "./choice";
import Concurrency from "./concurrency";

export default class ControlSurveyBox extends Concurrency {
    choiceId: number = 0;
    choice!: Choice;
    startX: number = 0;
    startY: number = 0;
    width: number = 0;
    height: number = 0;

    coordinateFilter(x: number, y: number): boolean {
        return (x <= this.startX + this.width &&
            x > this.startX) &&
            (y <= this.startY % this.height &&
                y > this.startY);
    }
}
