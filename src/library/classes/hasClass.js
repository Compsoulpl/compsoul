export default function hasClass(classes) {
  let hasClass = false,
      arrayClass = classes.split(" ");

  for(let index = 0; index < this.node.length; index++) {
    for(let indexClass = 0; indexClass < arrayClass.length; indexClass++) {
      if(this.node[index].classList.contains(arrayClass[indexClass])) {
        hasClass = true;
        break;
      }
    }

    if(hasClass) break;
  }

  return hasClass;
}
