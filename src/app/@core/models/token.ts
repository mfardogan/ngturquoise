import ClientContext from "./client-context";

export default class Token {
    token: string = '';
    expireAt: Date = new Date();
    user: ClientContext = new ClientContext();
}

