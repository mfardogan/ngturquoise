import Administrator from "src/app/@core/models/administrator";
import BaseHttp from "src/app/base-http";

export default class AdminHttp extends BaseHttp<Administrator> {

    constructor() {
        super('/api/Administrators');
    }
}