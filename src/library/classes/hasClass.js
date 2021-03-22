export default function hasClass(classes) {
  let hasClass = false,
      arrayClass = classes.split(" ");

  for(let index = 0; index < this.node.length; index++) {
    for(let indexClasseses = 0; indexClasses < arrayClass.length; indexClasses++) {
      if(this.node[index].classList.contains(arrayClass[indexClasses])) {
        hasClass = true;
        break;
      }
    }

    if(hasClass) break;
  }

  return hasClass;
}
