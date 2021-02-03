export default class Events {
  on(type, callback, passive) {
    this.nodeList.forEach(
      (element) => element.addEventListener(type, callback, passive)
    )
    return this
  }

  off(type, callback, passive) {
    this.nodeList.forEach(
      (element) => element.removeEventListener(type, callback, passive)
    )
    return this
  }

}
