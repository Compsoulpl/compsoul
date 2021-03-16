export default function addClass(classes) {
  this.node.forEach((item) => {
     item.classList.add(...classes.split(" "));
  })

  return this;
}
