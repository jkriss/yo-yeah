module.exports = function (elementName, elementFunction) {

  var proto = Object.create(HTMLElement.prototype);

  proto.createdCallback = function () {
    var children = []
    for (var i=0; i<this.children.length; i++) {
      console.log(this.children[i])
      children.push(this.removeChild(this.children[i]))
    }
    this._attrs = { children : children }
    for (var i=0; i<this.attributes.length; i++) {
      var attr = this.attributes[i]
      this._attrs[attr.name] = attr.value
    }
    this.el = elementFunction(this._attrs)
    this.appendChild(this.el)
  };

  proto.attributeChangedCallback = function (key, oldValue, newValue){
    this._attrs[key] = newValue
    if (this.el.update) this.el.update(this._attrs)
  }

  return document.registerElement(elementName, { prototype: proto });

}
