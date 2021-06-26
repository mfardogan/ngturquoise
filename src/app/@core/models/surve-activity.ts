import Survey from "./survey";
import ViewModel from "./view-model";

class SurveyActivity extends ViewModel {
    survey!: Survey;
    isCreation: boolean = false;
    surveyStatus!: number;
    creationAt: Date = new Date();
}

export default SurveyActivity;