import Compsoul from "../../lib/Compsoul.js";

export class Scroll {
  constructor(selector) {
    this.selector = selector
    this.settings = {
      selector: selector,
      callback: () => {}
    }
  }

  events() {
    let element, test;
    element = new Compsoul(this.selector);
    test = function() {
      console.log(this);
    }

    // element.on("click", test, true);
    // element.off("click", test, true);

  }

  utils() {
    //console.log(Compsoul.now())
    console.log(Compsoul.parseHTML("<table><tr><td>Hello World!</td></tr></table><div></div>"))
  }

  class() {
    let test = new Compsoul(this.selector).addClass("test").removeClass("test").addClass("test").hasClass("test");
    console.log(test);
    return this;
  }

}
