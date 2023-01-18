import Cookies from "js-cookie";

class CookieManager {
    constructor(name, handlerFunc=null) {
        this.cookieName = name;
        this.cookieHandler = handlerFunc;
    }
}