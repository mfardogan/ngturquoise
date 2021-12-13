import Concurrency from "./concurrency";
import { ControlSurveyAnswerBox } from "./control-survey-answer-box";

export class ControlSurveyAnswer extends Concurrency {
    controlSurveyId: number = 0;
    doctorId: number = 0;
    creationAt!: Date;
    boxes: ControlSurveyAnswerBox[] = [];
}