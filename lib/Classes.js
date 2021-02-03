export default class Classes {
  addClass(classList) {
    this.nodeList.forEach(
      (element) => element.classList.add(...classList.split(" "))
    )
    return this
  }

  removeClass(classList) {
    this.nodeList.forEach(
      (element) => element.classList.remove(...classList.split(" "))
    )
    return this
  }

  toggleClass(classList) {
    this.nodeList.forEach(
      (element) => element.classList.toggle(...classList.split(" "))
    )
    return this
  }

  hasClass(className) {
    let hasClass = false
    this.nodeList.forEach(
      (element) => {if (element.classList.contains(className)) hasClass = true}
    )
    return hasClass
  }
}
