import File from "./file";
import Concurrency from "./concurrency";

class Administrator extends Concurrency {
    title!: string;
    name: string = '';
    surname: string = '';
    fullName!: string;
    email: string = '';
    phone: string = '';
    creationAt!: Date;
    password: string = '';
    facebook!: string;
    linkedin!: string;
    instagram!: string;
    about!: string;
    systemOwner: boolean = false;
    gender: number = 0;
    createdSurveys: number = 0;
    image!: File;
}

export default Administrator;