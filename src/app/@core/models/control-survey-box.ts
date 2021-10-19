import Choice from "./choice";
import Concurrency from "./concurrency";

export default class ControlSurveyBox extends Concurrency {
    choiceId: number = 0;
    choice!: Choice;
    startX: number = 0;
    startY: number = 0;
    width: number = 0;
    height: number = 0;
}
