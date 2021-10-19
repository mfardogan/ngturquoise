import Administrator from "./administrator";
import Concurrency from "./concurrency";
import ControlSurveyBox from "./control-survey-box";
import ControlSurveyImage from "./control-survey-image";
import ControlSurveySmallImage from "./control-survey-small-image";

export default class ControlSurvey extends Concurrency {
    title: string = '';
    body: string = '';
    createdBy: number = 0;
    administrator!: Administrator;
    creationAt!: Date;
    image!: ControlSurveyImage;
    smallImage!: ControlSurveySmallImage;
    boxes: Array<ControlSurveyBox> = [];
}
