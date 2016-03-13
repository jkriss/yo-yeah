var yo = require('yo-yo')

module.exports = function (state) {
  var el = render(state.children)
  function render (children) {
    return yo`<div>
      <div>header bit</div>
      ${children}
      <div>footer bit</div>
    </div>`
  }
  return el
}
