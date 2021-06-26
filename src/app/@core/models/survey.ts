import Administrator from "./administrator";
import ChoiceGroup from "./choice-group";
import Concurrency from "./concurrency";
import File from "./file";

class Survey extends Concurrency {
    createdBy: number = 0;
    administrator!: Administrator;
    status: number = 0;
    title: string = '';
    body!: string;
    creationAt!: Date;
    choiceGroupId: number = 0;
    choiceGroup!: ChoiceGroup;
    images: Array<File> = [];
    smallImages: Array<File> = [];
}

export default Survey;