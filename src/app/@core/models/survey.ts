import Administrator from "./administrator";
import ChoiceGroup from "./choice-group";
import Concurrency from "./concurrency";
import File from "./file";
import SurveySmallImage from "./survey-small-image";

class Survey extends Concurrency {
    createdBy: number = 0;
    administrator!: Administrator;
    status!: number;
    title: string = '';
    body!: string;
    creationAt!: Date;
    progressPercent: number = 0;
    choiceGroupId: number = 0;
    choiceGroup!: ChoiceGroup;
    images: Array<File> = [];
    answerCount: number = 0;
    smallImages: Array<SurveySmallImage> = [];
    startAt!: Date;
    finishAt!: Date;
    startNow: boolean = false;
    automaticFinish: boolean = false;
}

export default Survey;