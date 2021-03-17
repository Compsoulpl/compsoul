export default function replaceClass(oldClass, newClass) {
  this.node.forEach((item) => {
     item.classList.replace(oldClass, newClass);
  })

  return this;
}
