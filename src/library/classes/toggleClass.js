export default function toggleClass(className, condition) {
  this.node.forEach((item) => {
     item.classList.toggle(className, condition);
  })

  return this;
}
