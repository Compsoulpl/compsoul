import Classes from "./Classes.js";
import Events from "./Events.js";
import Utils from "./Utils.js";

export default class Compsoul {
  constructor (selector) {
    this.nodeList = document.querySelectorAll(selector);

    this.classes = new Classes;
    this.addClass = this.classes.addClass;
    this.removeClass = this.classes.removeClass;
    this.toggleClass = this.classes.toggleClass;
    this.hasClass = this.classes.hasClass;

    this.events = new Events;
    this.on = this.events.on;
    this.off = this.events.off;
  }
}

Compsoul.utils = new Utils;
Compsoul.now = Compsoul.utils.now;
Compsoul.parseHTML = Compsoul.utils.parseHTML;
Compsoul.parseHTML = Compsoul.utils.ajax;
