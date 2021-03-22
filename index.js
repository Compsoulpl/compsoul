import Compsoul from "../src/library/index.js"
import addClass from "../src/library/classes/addClass.js"
import hasClass from "../src/library/classes/hasClass.js"

let test = Compsoul.mount({ addClass, hasClass });


  new test("li").addClass("test jest dobry czy nie jest")

  console.log(new test("li").hasClass("test jest dobry czy nie jest"));


document.querySelector("body").addEventListener("click", () => {

}, false);
