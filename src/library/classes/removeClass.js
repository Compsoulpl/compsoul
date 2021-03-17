export default function removeClass(classes) {
  this.node.forEach((item) => {
     item.classList.remove(...classes.split(" "));
  })

  return this;
}
