var yo = require('yo-yo')

module.exports = function (state) {
  var el = render(state.message)
  function render (m) {
    if (m === undefined) m = "This is the default message."
    return yo`<div>
      Message is: ${m}
      <button onclick=${reset}>reset</button>
    </div>`
  }
  function reset () {
    yo.update(el, render())
  }
  el.update = function (state) {
    yo.update(el, render(state.message))
  }
  return el
}
